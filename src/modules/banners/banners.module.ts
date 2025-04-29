import { Module } from '@nestjs/common';
import { Service } from './banners.service';
import { MainController } from './banners.controller';

@Module({
  controllers: [MainController],
  providers: [Service],
})
export class BannersModule {} 