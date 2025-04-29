import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'admin@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Profile image URL',
    example: 'https://example.com/image.jpg',
    nullable: true,
  })
  image?: string;

  @ApiProperty({
    description: 'User role',
    example: 'admin',
    enum: ['user', 'admin'],
  })
  role: string;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}
