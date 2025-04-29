import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { count, desc, eq, ilike } from 'drizzle-orm';
import { products } from '../db/db.schema';
import { Db } from '../db/db.service';
import {
  CreateUpdateProductDto,
  CommonNameGetListQueryDto,
} from './products.dto';
import { paginatedResponse } from '../../utils/response.utils';
import { ParamIdDto } from '../../utils/types/express.type';

@Injectable()
export class Service {
  constructor(private db: Db) {}

  async create(dto: CreateUpdateProductDto) {
    const [res] = await this.db.db
      .insert(products)
      .values({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        categoryId: dto.categoryId,
        imageUrl: dto.imageUrl as any,
      })
      .returning()
      .execute();

    return res;
  }

  async findManyWithPagination(query: CommonNameGetListQueryDto) {
    const querySql = this.db.db.select().from(products);

    if (query.name) {
      querySql.where(ilike(products.name, `%${query.name}%`));
    }

    const totalCount = await this.db.db
      .select({ count: count() })
      .from(products);

    const items = await querySql
      .orderBy(desc(products.createdAt))
      .limit(query.limit)
      .offset((query.page - 1) * query.limit);

    return paginatedResponse([items, totalCount[0].count], query);
  }

  async findOne(fields: ParamIdDto) {
    const [one] = await this.db.db
      .select()
      .from(products)
      .where(eq(products.id, fields.id))
      .limit(1);

    if (!one) {
      throw new NotFoundException();
    }

    return one;
  }

  async update(id: number, dto: CreateUpdateProductDto) {
    await this.db.db
      .update(products)
      .set({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        categoryId: dto.categoryId,
        imageUrl: dto.imageUrl,
      })
      .where(eq(products.id, id))
      .execute();

    return this.findOne({ id });
  }

  async softDelete(id: number) {
    await this.db.db.delete(products).where(eq(products.id, id)).execute();

    return {
      message: `Deleted`,
      statusCode: HttpStatus.OK,
    };
  }
}
