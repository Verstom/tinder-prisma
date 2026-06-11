import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: 'prisma/subscriptions/subscriptions.prisma',
  datasource: {
    url: env("SUBSCRIPTIONS_DATABASE_URL"),
  },
});