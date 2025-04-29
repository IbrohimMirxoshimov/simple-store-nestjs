import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: 'Unique identifier for the product' })
  id: number;

  @ApiProperty({ description: 'Name of the product' })
  name: string;

  @ApiPropertyOptional({ description: 'Description of the product' })
  description?: string;

  @ApiProperty({ description: 'Price of the product' })
  price: string;

  @ApiProperty({ description: 'Available stock quantity' })
  stock: number;

  @ApiProperty({ description: 'Category ID the product belongs to' })
  categoryId: number;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;
}
