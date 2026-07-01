import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Configuración de Prisma para messages-service
// Base de datos: messages_db
// Esquema:       ../prisma/messages/messages.prisma
export default defineConfig({
  schema: '../prisma/messages/messages.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
