import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../db/db.schema';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'admin@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for authentication',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Profile image URL',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+998901234567',
    required: false,
  })
  @IsPhoneNumber('UZ')
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'User role',
    example: UserRole.customer,
    enum: UserRole,
    default: UserRole.customer,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole = UserRole.customer;
}
