import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./users/users.prisma",
  datasources: {
    db: {
      url: process.env.USERS_DATABASE_URL,
    },
  },
});