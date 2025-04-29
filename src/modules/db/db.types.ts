import { VercelPgDatabase } from 'drizzle-orm/vercel-postgres';
import * as schema from './db.schema';

export type DrizzleClient = VercelPgDatabase<typeof schema>;
