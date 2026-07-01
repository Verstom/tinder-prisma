import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Configuración de Prisma para matches-service
// Base de datos: matches_db
// Esquema:       ../prisma/matches/matches.prisma
export default defineConfig({
  schema: '../prisma/matches/matches.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
