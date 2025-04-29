import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { count, desc, eq, ilike } from 'drizzle-orm';
import { categories } from '../db/db.schema';
import { Db } from '../db/db.service';
import { CreateUpdateCategoryDto } from './categories.dto';
import { paginatedResponse } from '../../utils/response.utils';
import { ParamIdDto } from '../../utils/types/express.type';
import { CommonNameGetListQueryDto } from '../products/products.dto';

@Injectable()
export class Service {
  constructor(private db: Db) {}

  async create(dto: CreateUpdateCategoryDto) {
    const [res] = await this.db.db
      .insert(categories)
      .values({
        name: dto.name,
        description: dto.description,
      })
      .returning()
      .execute();

    return res;
  }

  async findManyWithPagination(query: CommonNameGetListQueryDto) {
    const querySql = this.db.db.select().from(categories);

    if (query.name) {
      querySql.where(ilike(categories.name, `%${query.name}%`));
    }

    const totalCount = await this.db.db
      .select({ count: count() })
      .from(categories);

    const items = await querySql
      .orderBy(desc(categories.createdAt))
      .limit(query.limit)
      .offset((query.page - 1) * query.limit);

    return paginatedResponse([items, totalCount[0].count], query);
  }

  async findOne(fields: ParamIdDto) {
    const [one] = await this.db.db
      .select()
      .from(categories)
      .where(eq(categories.id, fields.id))
      .limit(1);

    if (!one) {
      throw new NotFoundException();
    }

    return one;
  }

  async update(id: number, dto: CreateUpdateCategoryDto) {
    await this.db.db
      .update(categories)
      .set({
        name: dto.name,
        description: dto.description,
      })
      .where(eq(categories.id, id))
      .execute();

    return this.findOne({ id });
  }

  async softDelete(id: number) {
    await this.db.db.delete(categories).where(eq(categories.id, id)).execute();

    return {
      message: `Deleted`,
      statusCode: HttpStatus.OK,
    };
  }
}
