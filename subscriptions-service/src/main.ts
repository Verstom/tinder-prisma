import { NestFactory } from '@nestjs/core';
import { SubscriptionsServiceModule } from './subscriptions-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SubscriptionsServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
