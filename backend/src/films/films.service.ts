import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/films.dto';
import { FilmDocument } from './shemas/films.shema';
import { FilmAlreadyExistsException } from 'src/exceptions/film-exists.exception';
import { FilmMissingException } from 'src/exceptions/film-missing.exception ';
import { ITicket, ITicketChecked } from 'src/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILM_MODEL')
    private filmModel: Model<FilmDocument>,
  ) {}

  async create(data: CreateFilmDto) {
    if (await this.findByTitle(data.title)) {
      throw new FilmAlreadyExistsException();
    }
    try {
      return this.filmModel.create({ ...data, id: uuid() });
    } catch (e) {
      throw new Error('Фильм с таким названием уже существует');
    }
  }

  async findAll() {
    return this.filmModel
      .find({})
      .then((data) => ({ items: data, total: data.length }));
  }

  findById(id: string) {
    return this.filmModel.find({ id }).then((data) => {
      if (!data.length) throw new FilmMissingException();

      return { items: data[0].schedule ?? [], total: data[0].schedule.length };
    });
  }

  findByTitle(title: string) {
    return this.filmModel.findOne({ title });
  }

  async updateSeat(ticket: ITicket): Promise<ITicketChecked> {
    const seat = `${ticket.row}:${ticket.seat}`;

    const film = await this.findById(ticket.film);
    
    const scheduleIndex: number = film.items.findIndex(
      (item) => item.id === ticket.session,
    );
    const updatePath = `schedule.${scheduleIndex.toString()}.taken`;
    try {
      if (!film.items[scheduleIndex].taken.includes(seat)) {
        await this.filmModel.updateOne(
          { id: ticket.film },
          { $push: { [updatePath]: seat } },
        );
        return { ...ticket, isFree: true };
      } else {
        return { ...ticket, isFree: false };
      }
    } catch (e) {
      throw new Error('Error add seat');
    }
  }
}