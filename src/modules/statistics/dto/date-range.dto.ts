import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DateRangeDto {
  @ApiProperty({
    description: 'Start date in YYYY-MM-DD format',
    example: getLastMonthDate(),
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date in YYYY-MM-DD format',
    example: getCurrentDate(),
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

function getLastMonthDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().split('T')[0];
}

function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}
