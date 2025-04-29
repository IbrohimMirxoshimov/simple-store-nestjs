import { ApiProperty } from '@nestjs/swagger';
import { IsOnlyId } from '../validators/is-only-id-dto.validator';
import { IsPositiveInt } from '../validators/is-positive-int.validator';

export class OnlyIdDto {
  @ApiProperty()
  @IsPositiveInt()
  id: number;
}

export class IdWithPropertyIdDto extends OnlyIdDto {
  @ApiProperty({ type: OnlyIdDto })
  @IsOnlyId()
  property: OnlyIdDto;
}
