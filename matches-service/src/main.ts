import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MatchesServiceModule } from './matches-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MatchesServiceModule);

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

  const port = process.env.PORT ? Number(process.env.PORT) : 3003;

  await app.listen(port);

  console.log(`🚀 Matches Service running on http://localhost:${port}`);
}

bootstrap();
