import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/films.dto';
import { FilmDocument } from './shemas/films.shema';
import { FilmAlreadyExistsException } from 'src/exceptions/film-exists.exception';
import { FilmMissingException } from 'src/exceptions/film-missing.exception ';
import { ITicket, ITicketChecked } from 'src/types';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { Film } from './entities/film.entity';
import { FilmTags } from './entities/film-tags.entity';
import { Schedule } from './entities/schedule.entity';
import { ScheduleMissingException } from 'src/exceptions/schedule-missing.exception ';
import { ScheduleTaken } from './entities/schedule-taken.entity';
import { convertSchedule } from './helper/films.helper';
import { DeleteException } from 'src/exceptions/delete.exception ';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILM_MODEL')
    private filmModel: Model<FilmDocument>,
    @InjectEntityManager()
    private filmManager: EntityManager,
    private readonly dataSource: DataSource,
  ) {}

  async create(data: CreateFilmDto) {
    if (await this.findByTitle(data.title))
      throw new FilmAlreadyExistsException();
    const {
      rating,
      director,
      tags,
      image,
      cover,
      title,
      about,
      description,
      schedule,
    } = data;

    return this.filmManager
      .save(Film, {
        rating,
        director,
        image,
        cover,
        title,
        about,
        description,
      })
      .then(async (film) => {
        const promiseFilmTags = await this.filmManager.save(
          FilmTags,
          tags.map((tag) => ({ filmId: film.id, tag })),
        );

        const promiseFilmSchedule = await this.filmManager.save(
          Schedule,
          schedule.map((item) => ({ ...item, filmId: film.id })),
        );

        const [filmTags, filmSchedule] = await Promise.all([
          promiseFilmTags,
          promiseFilmSchedule,
        ]);

        return {
          ...film,
          tags: filmTags.map(({ tag }) => tag),
          schedule: filmSchedule,
        };
      });
  }

  async findAll() {
    return this.filmManager
      .find(Film, { relations: { schedule: true } })
      .then((data) => ({ items: data, total: data.length }));
  }

  findById(id: string) {
    return this.filmManager
      .findOneBy(Film, { id: parseInt(id) })
      .then((film) => {
        if (!film) throw new FilmMissingException();

        return this.filmManager
          .find(Schedule, {
            where: { filmId: parseInt(id) },
            order: { daytime: 'ASC' },
            relations: {
              taken: true,
            },
          })
          .then((schedule) => {
            if (!schedule || !schedule.length)
              throw new ScheduleMissingException();
            return {
              items: convertSchedule(schedule),
              total: schedule.length,
            };
          });
      });
  }

  findByTitle(title: string) {
    return this.filmManager.findOne(Film, { where: { title } });
  }

  async updateSeat(ticket: ITicket): Promise<ITicketChecked> {
    const seat = `${ticket.row}:${ticket.seat}`;

    const film = await this.findById(ticket.film);

    const scheduleIndex: number = film.items.findIndex(
      (item) => item.id.toString() === ticket.session,
    );

    try {
      if (!film.items[scheduleIndex].taken.includes(seat)) {
        await this.filmManager.save(ScheduleTaken, {
          scheduleId: parseInt(ticket.session),
          seat,
        });
        return { ...ticket, isFree: true };
      } else {
        return { ...ticket, isFree: false };
      }
    } catch (e) {
      throw new Error('Error add seat');
    }
  }

  async remove(str: string) {
    const film = await this.findByTitle(str);
    const id = film ? film.id : parseInt(str);

    if (isNaN(id)) throw new FilmMissingException();

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let res;
    try {
      const films = this.filmManager.delete(Film, { id });
      const film_tags = this.filmManager.delete(FilmTags, { filmId: id });
      const schedule = this.filmManager.delete(Schedule, { filmId: id });
      res = await Promise.all([films, film_tags, schedule]);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new DeleteException();
    } finally {
      await queryRunner.release();
    }

    return res;
  }
}
