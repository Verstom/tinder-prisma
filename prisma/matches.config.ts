import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./matches/matches.prisma",
  datasource: {
    url: env("MATCHES_DATABASE_URL"),
  },
});