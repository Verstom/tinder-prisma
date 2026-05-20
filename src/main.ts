import testJwtRoutes from "./routes/test-jwt.routes";
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(testJwtRoutes);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
