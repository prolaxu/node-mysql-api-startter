import type { Config } from "drizzle-kit";
import dbConfig from "./database";
 
export default {
  schema: "./src/database/migrations/index.ts",
  driver: "mysql2",
  dbCredentials: dbConfig
} satisfies Config;