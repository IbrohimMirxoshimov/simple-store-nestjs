import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FindProductsDto } from './dto/find-products.dto';
import { PublicService } from './public.service';
import { CreatePublicOrderDto } from './dto/create-public-order.dto';
import { FindPublicOrdersDto } from './dto/find-public-orders.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Front')
@Controller('front')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @ApiOperation({ summary: 'Get all active banners' })
  @Get('/banners')
  findAllBanners() {
    return this.publicService.findAllBanners();
  }

  @ApiOperation({ summary: 'Get all active categories' })
  @Get('/categories')
  findAllCategories() {
    return this.publicService.findAllCategories();
  }

  @ApiOperation({
    summary: 'Get all products with optional filtering and pagination',
  })
  @Get('/products')
  findAllProducts(@Query() findProductsDto: FindProductsDto) {
    return this.publicService.findAllProducts(findProductsDto);
  }

  @ApiOperation({ summary: 'Get a specific product by ID' })
  @Get('/products/:id')
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.publicService.findOneProduct(id);
  }

  @ApiOperation({ summary: 'Create a new order for authenticated customer' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/orders')
  createOrder(
    @Body() createOrderDto: CreatePublicOrderDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.publicService.createOrder(createOrderDto, user.id);
  }

  @ApiOperation({
    summary: 'Get authenticated customer orders with pagination',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/orders')
  findOrders(@Query() findOrdersDto: FindPublicOrdersDto, @Req() req: Request) {
    const user = req.user as any;
    return this.publicService.findOrders(findOrdersDto, user.id);
  }

  @ApiOperation({
    summary: 'Get a specific order by ID for authenticated customer',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/orders/:id')
  findOneOrder(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as any;
    return this.publicService.findOneOrder(id, user.id);
  }
}
