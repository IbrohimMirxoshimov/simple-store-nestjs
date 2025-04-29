import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { GetListQuery } from '../../utils/types/express.type';

export class CreateUpdateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'Category ID the product belongs to',
    example: 1,
  })
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional()
  @IsString()
  imageUrl?: string;
}

export class CommonNameGetListQueryDto extends GetListQuery {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;
}
