import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: 'prisma/messages/messages.prisma',
  datasource: {
    url: env("MESSAGES_DATABASE_URL"),
  },
});