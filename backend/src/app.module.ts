import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { DatabaseModule } from './database/database.module';
import { filmsProviders } from './films/films.providers';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    DatabaseModule,
    FilmsModule,
    OrderModule,
    SchedulesModule,
  ],
  providers: [...filmsProviders],
})
export class AppModule {}
