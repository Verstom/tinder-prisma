import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import createTestJwtRoutes from './routes/test-jwt.routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);

  app.use('/jwt', createTestJwtRoutes(prismaService));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();