import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { configProvider } from 'src/app.config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/../*/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [configProvider, ...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
