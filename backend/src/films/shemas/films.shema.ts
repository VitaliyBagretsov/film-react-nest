import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ISchedule } from 'src/types';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop()
  rating: number;

  @Prop()
  director: string;

  @Prop()
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop({ unique: true })
  title: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop()
  schedule: ISchedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
