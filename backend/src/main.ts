import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { JsonLogger } from './logger/json.logger';
import { DevLogger } from './logger/dev.logget';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(
    app.get('CONFIG').mode === 'production'
      ? new JsonLogger()
      : new DevLogger(),
  );
  await app.listen(3000);
}
bootstrap();
