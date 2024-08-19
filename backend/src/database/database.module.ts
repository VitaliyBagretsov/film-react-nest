import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { configProvider } from 'src/app.config.provider';

@Module({
  providers: [configProvider, ...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}