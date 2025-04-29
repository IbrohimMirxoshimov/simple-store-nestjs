import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ description: 'Product ID' })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({ description: 'Quantity to order' })
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;
}

export class CreatePublicOrderDto {
  @ApiPropertyOptional({ description: 'Customer address' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ 
    description: 'Order items', 
    type: [OrderItemDto], 
    example: [{ productId: 1, quantity: 2 }] 
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

