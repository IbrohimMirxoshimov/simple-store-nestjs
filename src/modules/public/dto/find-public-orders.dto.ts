import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderStatus } from '../../db/db.schema';
import { GetListQuery } from '../../../utils/types/express.type';
import { Transform } from 'class-transformer';
import { transformToInt } from '../../../utils/transformers';

export class FindPublicOrdersDto extends GetListQuery {
  @ApiPropertyOptional({ 
    description: 'Filter by order status', 
    enum: OrderStatus,
    example: OrderStatus.PENDING
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional({ 
    description: 'Filter by customer ID', 
    example: 1
  })
  @Transform(transformToInt)
  @IsNumber()
  @IsOptional()
  customerId?: number;
} 