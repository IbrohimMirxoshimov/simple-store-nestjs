import * as dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/modules/db/db.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
