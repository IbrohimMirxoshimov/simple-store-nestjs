import { Module } from '@nestjs/common';
import { Service } from './products.service';
import { MainController } from './products.controller';

@Module({
  controllers: [MainController],
  providers: [Service],
})
export class ProductsModule {}
