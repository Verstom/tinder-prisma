import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Configuración de Prisma para interactions-service
// Base de datos: interactions_db
// Esquema:       ../prisma/interactions/interactions.prisma
export default defineConfig({
  schema: '../prisma/interactions/interactions.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
