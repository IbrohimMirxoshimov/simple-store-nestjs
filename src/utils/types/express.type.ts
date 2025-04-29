import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiEnum } from '../swagger/ApiEnum';
import { transformToInt } from '../transformers';
import { IsPositiveInt } from '../validators/is-positive-int.validator';
import { UserRole } from '../../modules/db/db.schema';

export enum SqlOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type JwtPayload = {
  // User id
  id: number;
  // User Role Entity
  role: UserRole;

  /**
   * Faqat PropertyGruard bor joyad keladi
   */
  primary_property_id?: number;
};

export type CustomerJwtPayload = {
  // User id
  id: number;
};

export interface ExpressRequestUserPayload extends Express.Request {
  user: JwtPayload;
}

export interface BaseResponse {
  message: string;
}
export class ResponseItems<T extends Object = any> implements BaseResponse {
  @ApiProperty({ type: Object, isArray: true })
  items: T[];
  @ApiProperty({
    default: 10,
  })
  page: number;
  @ApiProperty({
    default: 1,
  })
  total: number;
  @ApiPropertyOptional()
  message: string;
}

export class GetListQuery {
  @ApiPropertyOptional({ default: 10, maximum: 100 })
  @Transform(({ value }) => {
    if (value) {
      const _v = parseInt(value);
      return _v > 100 ? 100 : _v;
    }

    return 10;
  })
  @IsPositiveInt()
  @IsOptional()
  public limit: number = 100;

  @ApiPropertyOptional({
    default: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsPositiveInt()
  @IsOptional()
  public page: number = 1;

  @ApiEnum(SqlOrderEnum, {
    required: false,
    type: 'string',
  })
  @IsEnum(SqlOrderEnum)
  @IsOptional()
  public order: SqlOrderEnum = SqlOrderEnum.DESC;

  @ApiPropertyOptional()
  @IsOptional()
  order_by?: string;
}

export class GetListQueryWithNameDto extends GetListQuery {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;
}

export class ParamIdDto {
  @ApiProperty({ default: 1 })
  @Transform(transformToInt)
  @IsPositiveInt()
  id: number;
}
