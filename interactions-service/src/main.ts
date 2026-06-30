import { NestFactory } from '@nestjs/core';
import { InteractionsServiceModule } from './interactions-service.module';

async function bootstrap() {
  const app = await NestFactory.create(InteractionsServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
