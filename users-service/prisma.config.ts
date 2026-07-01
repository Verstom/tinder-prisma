import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Configuración de Prisma para users-service
// Base de datos: users_db
// Esquema:       ../prisma/users/users.prisma
export default defineConfig({
  schema: '../prisma/users/users.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
