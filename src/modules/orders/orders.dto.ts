import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { GetListQuery } from '../../utils/types/express.type';
import { OrderStatus } from '../db/db.schema';

export class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  customerId: number;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class GetOrdersQueryDto extends GetListQuery {
  @ApiPropertyOptional({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  customerId?: number;
}
