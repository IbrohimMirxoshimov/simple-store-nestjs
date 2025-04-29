import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { GetListQuery } from '../../utils/types/express.type';

export class CreateUpdateBannerDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CommonTitleGetListQueryDto extends GetListQuery {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;
} 