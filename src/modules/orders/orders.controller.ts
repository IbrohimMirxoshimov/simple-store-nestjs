import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDto, GetOrdersQueryDto, UpdateOrderStatusDto } from './orders.dto';
import { OrdersService } from './orders.service';
import { ParamIdDto } from '../../utils/types/express.type';

@ApiBearerAuth()
@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'orders',
})
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: GetOrdersQueryDto) {
    return this.service.findManyWithPagination(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() param: ParamIdDto) {
    return this.service.findOne(param);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateStatus(@Param() param: ParamIdDto, @Body() dto: UpdateOrderStatusDto) {
    return this.service.updateStatus(param.id, dto);
  }

  @Delete(':id')
  remove(@Param() param: ParamIdDto) {
    return this.service.delete(param.id);
  }
} 