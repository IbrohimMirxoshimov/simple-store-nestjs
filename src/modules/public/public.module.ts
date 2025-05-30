import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';

@Module({
  imports: [],
  providers: [PublicService],
  controllers: [PublicController],
})
export class PublicModule {}
