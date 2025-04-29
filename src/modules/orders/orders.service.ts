import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { count, desc, eq, inArray } from 'drizzle-orm';
import { paginatedResponse } from '../../utils/response.utils';
import { ParamIdDto } from '../../utils/types/express.type';
import { orderItems, orders, OrderStatus, products } from '../db/db.schema';
import { Db } from '../db/db.service';
import {
  CreateOrderDto,
  GetOrdersQueryDto,
  UpdateOrderStatusDto,
} from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(private db: Db) {}

  async create(dto: CreateOrderDto) {
    const productsToOrder = await Promise.all(
      dto.items.map(async (item) => {
        const [product] = await this.db.db
          .select()
          .from(products)
          .where(eq(products.id, item.productId))
          .limit(1);

        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(`Not enough stock for product ${product.name}`);
        }

        return {
          ...item,
          price: product.price,
          product,
        };
      }),
    );

    const totalAmount = productsToOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const [order] = await this.db.db
      .insert(orders)
      .values({
        customerId: dto.customerId,
        totalPrice: totalAmount,
        status: OrderStatus.PENDING,
      })
      .returning();

    await this.db.db.insert(orderItems).values(
      productsToOrder.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    );

    // Update product stock
    await Promise.all(
      productsToOrder.map((item) =>
        this.db.db
          .update(products)
          .set({ stock: item.product.stock - item.quantity })
          .where(eq(products.id, item.productId)),
      ),
    );

    return this.findOne({ id: order.id });
  }

  async findManyWithPagination(query: GetOrdersQueryDto) {
    // First, get order IDs with proper pagination
    const ordersQuery = this.db.db
      .select({
        id: orders.id,
      })
      .from(orders);

    if (query.status) {
      ordersQuery.where(eq(orders.status, query.status));
    }

    if (query.customerId) {
      ordersQuery.where(eq(orders.customerId, query.customerId));
    }

    const totalCountQuery = this.db.db
      .select({ count: count() })
      .from(orders);
      
    if (query.status) {
      totalCountQuery.where(eq(orders.status, query.status));
    }
    
    if (query.customerId) {
      totalCountQuery.where(eq(orders.customerId, query.customerId));
    }

    const totalCount = await totalCountQuery;

    const orderIds = await ordersQuery
      .orderBy(desc(orders.createdAt))
      .limit(query.limit)
      .offset((query.page - 1) * query.limit);

    if (orderIds.length === 0) {
      return paginatedResponse([[], 0], query);
    }

    // Then fetch full order details with items for these IDs
    const results = await this.db.db
      .select({
        order: orders,
        items: orderItems,
      })
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .where(
        inArray(orders.id, orderIds.map(o => o.id))
      )
      .orderBy(desc(orders.createdAt));

    // Group items by order
    const groupedOrders = results.reduce((acc, row) => {
      const orderId = row.order.id;
      if (!acc[orderId]) {
        acc[orderId] = {
          ...row.order,
          items: [],
        };
      }
      if (row.items) {
        acc[orderId].items.push(row.items);
      }
      return acc;
    }, {} as any);

    const items = Object.values(groupedOrders);

    return paginatedResponse([items, totalCount[0].count], query);
  }

  async findOne(fields: ParamIdDto) {
    const [order] = await this.db.db
      .select()
      .from(orders)
      .where(eq(orders.id, fields.id))
      .limit(1);

    if (!order) {
      throw new NotFoundException();
    }

    const items = await this.db.db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    return { ...order, items };
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    await this.db.db
      .update(orders)
      .set({ status: dto.status })
      .where(eq(orders.id, id));

    return this.findOne({ id });
  }

  async delete(id: number) {
    await this.db.db.delete(orders).where(eq(orders.id, id));

    return {
      message: 'Deleted',
      statusCode: HttpStatus.OK,
    };
  }
}
