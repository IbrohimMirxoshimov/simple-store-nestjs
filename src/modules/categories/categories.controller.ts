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
import { ParamIdDto } from '../../utils/types/express.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonNameGetListQueryDto } from '../products/products.dto';
import { CreateUpdateCategoryDto } from './categories.dto';
import { Service } from './categories.service';

@ApiBearerAuth()
@ApiTags('Categories')
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'categories',
})
export class MainController {
  constructor(private readonly service: Service) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: CommonNameGetListQueryDto) {
    return this.service.findManyWithPagination(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUpdateCategoryDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() param: ParamIdDto) {
    return this.service.findOne(param);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param() param: ParamIdDto, @Body() dto: CreateUpdateCategoryDto) {
    return this.service.update(param.id, dto);
  }

  @Delete(':id')
  remove(@Param() param: ParamIdDto) {
    return this.service.softDelete(param.id);
  }
}
