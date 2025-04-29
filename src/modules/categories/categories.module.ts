import { Module } from '@nestjs/common';
import { Service } from './categories.service';
import { MainController } from './categories.controller';

@Module({
  controllers: [MainController],
  providers: [Service],
})
export class CategoriesModule {}
