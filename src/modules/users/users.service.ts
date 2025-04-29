import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { count, desc, eq, not } from 'drizzle-orm';
import { UserRole, users } from '../db/db.schema';
import { Db } from '../db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetListQuery } from '../../utils/types/express.type';
import { paginatedResponse } from '../../utils/response.utils';

@Injectable()
export class UsersService {
  constructor(private db: Db) {}

  async create(createUserDto: CreateUserDto) {
    // Check if user with email already exists
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create the user
    const [newUser] = await this.db.db
      .insert(users)
      .values({
        name: createUserDto.name,
        email: createUserDto.email,
        phone: createUserDto.phone,
        password: hashedPassword,
        image: createUserDto.image,
        role: createUserDto.role,
      })
      .returning();

    // Remove password from response
    const { password, ...result } = newUser;
    return result;
  }

  async findManyWithPagination(query: GetListQuery) {
    const querySql = this.db.db.select().from(users);

    const totalCount = await this.db.db.select({ count: count() }).from(users);

    const items = await querySql
      .where(not(eq(users.email, 'admin@nt.uz')))
      .orderBy(desc(users.createdAt))
      .limit(query.limit)
      .offset((query.page - 1) * query.limit);

    return paginatedResponse([items, totalCount[0].count - 1], query);
  }

  async findOne(id: number) {
    const [user] = await this.db.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .execute();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Remove password from response
    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    const [user] = await this.db.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Check if user exists
    await this.findOne(id);

    // Hash password if provided
    let updatedData = { ...updateUserDto };
    if (updateUserDto.password) {
      updatedData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update user
    const [updatedUser] = await this.db.db
      .update(users)
      .set(updatedData)
      .where(eq(users.id, id))
      .returning();

    // Remove password from response
    const { password, ...result } = updatedUser;
    return result;
  }

  async remove(id: number) {
    // Check if user exists
    await this.findOne(id);

    // Delete user
    await this.db.db.delete(users).where(eq(users.id, id)).execute();
    return { message: `User with ID ${id} successfully deleted` };
  }
}
