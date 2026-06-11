import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: 'prisma/users/users.prisma',
  datasource: {
    url: process.env.USERS_DATABASE_URL,
  },
});