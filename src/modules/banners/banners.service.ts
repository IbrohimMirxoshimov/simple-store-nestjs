import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { count, desc, eq, ilike } from 'drizzle-orm';
import { banners } from '../db/db.schema';
import { Db } from '../db/db.service';
import { CreateUpdateBannerDto, CommonTitleGetListQueryDto } from './banners.dto';
import { paginatedResponse } from '../../utils/response.utils';
import { ParamIdDto } from '../../utils/types/express.type';

@Injectable()
export class Service {
  constructor(private db: Db) {}

  async create(dto: CreateUpdateBannerDto) {
    const [res] = await this.db.db
      .insert(banners)
      .values({
        title: dto.title,
        imageUrl: dto.imageUrl,
        isActive: dto.isActive,
      })
      .returning()
      .execute();

    return res;
  }

  async findManyWithPagination(query: CommonTitleGetListQueryDto) {
    const querySql = this.db.db.select().from(banners);

    if (query.title) {
      querySql.where(ilike(banners.title, `%${query.title}%`));
    }

    const totalCount = await this.db.db
      .select({ count: count() })
      .from(banners);

    const items = await querySql
      .orderBy(desc(banners.createdAt))
      .limit(query.limit)
      .offset((query.page - 1) * query.limit);

    return paginatedResponse([items, totalCount[0].count], query);
  }

  async findOne(fields: ParamIdDto) {
    const [one] = await this.db.db
      .select()
      .from(banners)
      .where(eq(banners.id, fields.id))
      .limit(1);

    if (!one) {
      throw new NotFoundException();
    }

    return one;
  }

  async update(id: number, dto: CreateUpdateBannerDto) {
    await this.db.db
      .update(banners)
      .set({
        title: dto.title,
        imageUrl: dto.imageUrl,
        isActive: dto.isActive,
      })
      .where(eq(banners.id, id))
      .execute();

    return this.findOne({ id });
  }

  async softDelete(id: number) {
    await this.db.db.delete(banners).where(eq(banners.id, id)).execute();

    return {
      message: `Deleted`,
      statusCode: HttpStatus.OK,
    };
  }
} 