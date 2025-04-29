import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { and, count, eq, ilike, sql } from 'drizzle-orm';
import {
  products,
  banners,
  orders,
  orderItems,
  OrderStatus,
} from '../db/db.schema';
import { FindProductsDto } from './dto/find-products.dto';
import { PaginatedResponseDto } from './dto/pagination-response.dto';
import { Db } from '../db/db.service';
import { FindPublicOrdersDto } from './dto/find-public-orders.dto';
import { CreatePublicOrderDto } from './dto/create-public-order.dto';

@Injectable()
export class PublicService {
  constructor(private db: Db) {}

  async findAllBanners() {
    return this.db.db.select().from(banners).where(eq(banners.isActive, true));
  }

  async findAllCategories() {
    return this.db.db.query.categories.findMany();
  }

  async findAllProducts(filters?: FindProductsDto) {
    console.log(filters);

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const offset = (page - 1) * limit;

    // Build conditions array for filtering
    const conditions = [];

    if (filters?.categoryId) {
      conditions.push(eq(products.categoryId, filters.categoryId));
    }

    if (filters?.minPrice !== undefined) {
      conditions.push(sql`${products.price} >= ${filters.minPrice}`);
    }

    if (filters?.maxPrice !== undefined) {
      conditions.push(sql`${products.price} <= ${filters.maxPrice}`);
    }

    if (filters?.search) {
      conditions.push(ilike(products.name, `%${filters.search}%`));
    }

    // Execute count query to get total items
    const countQuery = this.db.db.select({ value: count() }).from(products);
    if (conditions.length > 0) {
      countQuery.where(and(...conditions));
    }
    const [countResult] = await countQuery.execute();
    const totalItems = Number(countResult?.value || 0);

    // Execute main query with pagination
    const query = this.db.db.select().from(products);
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }
    const items = await query.limit(limit).offset(offset).execute();

    // Return paginated response
    return {
      items,
      page,
      limit,
      totalItems,
    } as PaginatedResponseDto<(typeof items)[0]>;
  }

  async findOneProduct(id: number) {
    const one = await this.db.db.query.products.findFirst({
      where: eq(products.id, id),
    });

    if (!one) {
      throw new NotFoundException();
    }

    return one;
  }

  async createOrder(dto: CreatePublicOrderDto, customerId: number) {
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
          throw new BadRequestException(
            `Not enough stock for product ${product.name}`,
          );
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
        customerId,
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

    return this.findOneOrder(order.id, customerId);
  }

  async findOrders(query: FindPublicOrdersDto, customerId: number) {
    // Create conditions array for filtering
    const conditions = [eq(orders.customerId, customerId)];

    // Add status filter if provided
    if (query.status) {
      conditions.push(eq(orders.status, query.status));
    }

    // Start query to get orders with items and product details
    const querySql = this.db.db
      .select({
        order: orders,
        orderItem: orderItems,
        product: products,
      })
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(and(...conditions));

    // Get total count for pagination
    const [totalCountResult] = await this.db.db
      .select({ count: count() })
      .from(orders)
      .where(and(...conditions));

    // Apply pagination
    const results = await querySql
      .orderBy(sql`${orders.createdAt} DESC`)
      .limit(query.limit)
      .offset((query.page - 1) * query.limit);

    // Group items by order and include product details
    const groupedOrders = results.reduce(
      (acc, row) => {
        const orderId = row.order.id;
        if (!acc[orderId]) {
          acc[orderId] = {
            ...row.order,
            items: [],
          };
        }
        if (row.orderItem) {
          acc[orderId].items.push({
            ...row.orderItem,
            product: row.product,
          });
        }
        return acc;
      },
      {} as Record<number, any>,
    );

    const items = Object.values(groupedOrders);

    // Return paginated response
    return {
      items,
      page: query.page,
      limit: query.limit,
      totalItems: totalCountResult?.count || 0,
    };
  }

  async findOneOrder(id: number, customerId: number) {
    // Find the order first
    const [order] = await this.db.db
      .select()
      .from(orders)
      .where(and(eq(orders.id, id), eq(orders.customerId, customerId)))
      .limit(1);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Get the order items with product details
    const items = await this.db.db
      .select({
        orderItem: orderItems,
        product: products,
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, order.id));

    // Transform the items to include product details
    const transformedItems = items.map((item) => ({
      ...item.orderItem,
      product: item.product,
    }));

    // Return combined result
    return { ...order, items: transformedItems };
  }
}
