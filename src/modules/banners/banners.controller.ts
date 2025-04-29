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
import { CreateUpdateBannerDto, CommonTitleGetListQueryDto } from './banners.dto';
import { Service } from './banners.service';
import { ParamIdDto } from '../../utils/types/express.type';

@ApiBearerAuth()
@ApiTags('Banners')
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'banners',
})
export class MainController {
  constructor(private readonly service: Service) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: CommonTitleGetListQueryDto) {
    return this.service.findManyWithPagination(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUpdateBannerDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() param: ParamIdDto) {
    return this.service.findOne(param);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param() param: ParamIdDto, @Body() dto: CreateUpdateBannerDto) {
    return this.service.update(param.id, dto);
  }

  @Delete(':id')
  remove(@Param() param: ParamIdDto) {
    return this.service.softDelete(param.id);
  }
} 