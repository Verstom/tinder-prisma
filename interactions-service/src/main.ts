import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { InteractionsServiceModule } from './interactions-service.module';

async function bootstrap() {
  const app = await NestFactory.create(InteractionsServiceModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = process.env.PORT ? Number(process.env.PORT) : 3002;

  await app.listen(port);

  console.log(`🚀 Interactions Service running on http://localhost:${port}`);
}

bootstrap();
