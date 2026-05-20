import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./interactions/interactions.prisma",
  datasource: {
    url: env("INTERACTIONS_DATABASE_URL"),
  },
});