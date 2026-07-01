import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Configuración de Prisma para subscriptions-service
// Base de datos: subscriptions_db
// Esquema:       ../prisma/subscriptions/subscriptions.prisma
export default defineConfig({
  schema: '../prisma/subscriptions/subscriptions.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
