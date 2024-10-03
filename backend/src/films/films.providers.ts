import { Connection } from 'mongoose';
import { FilmSchema } from './shemas/films.shema';

export const filmsProviders = [
  // {
  //   provide: 'FILM_MODEL',
  //   useFactory: (connection: Connection) =>
  //     connection.model('Film', FilmSchema),
  //   inject: ['DATABASE_CONNECTION'],
  // },
];
