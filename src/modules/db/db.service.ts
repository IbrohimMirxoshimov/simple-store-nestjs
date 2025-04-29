import { Injectable } from '@nestjs/common';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './db.schema';
import { DrizzleClient } from './db.types';

@Injectable()
export class Db {
  public db: DrizzleClient;

  private onModuleInit() {
    this.db = drizzle(sql, { schema });
  }
}
