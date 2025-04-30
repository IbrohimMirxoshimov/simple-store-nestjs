import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { orderItems, orders, products, users } from '../db/db.schema';
import { Db } from '../db/db.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly drizzle: Db) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      this.drizzle.db.select({ count: sql<number>`count(*)` }).from(users),
      this.drizzle.db.select({ count: sql<number>`count(*)` }).from(orders),
      this.drizzle.db.select({ count: sql<number>`count(*)` }).from(products),
      this.drizzle.db
        .select({ total: sql<number>`sum("totalPrice")` })
        .from(orders),
      this.drizzle.db.select().from(orders).orderBy(orders.createdAt).limit(5),
      this.drizzle.db
        .select({
          id: products.id,
          name: products.name,
          totalSold: sql<number>`sum(order_items.quantity)`,
        })
        .from(products)
        .leftJoin(orderItems, sql`products.id = order_items."productId"`)
        .groupBy(products.id, products.name)
        .having(sql`sum(order_items.quantity) > 1`)
        .orderBy(sql`sum(order_items.quantity) desc`)
        .limit(5),
    ]);

    return {
      totalUsers: totalUsers[0].count,
      totalOrders: totalOrders[0].count,
      totalProducts: totalProducts[0].count,
      totalRevenue: totalRevenue[0].total || 0,
      recentOrders,
      topProducts,
    };
  }

  async getOrderStats() {
    const orderStats = await this.drizzle.db
      .select({
        status: orders.status,
        count: sql<number>`count(*)`,
      })
      .from(orders)
      .groupBy(orders.status);

    return orderStats;
  }

  async getRevenueStats(startDate: Date, endDate: Date) {
    const revenueStats = await this.drizzle.db
      .select({
        date: sql<string>`date_trunc('day', ${orders.createdAt})::date`,
        total: sql<number>`sum("totalPrice")`,
      })
      .from(orders)
      .where(sql`${orders.createdAt} between ${startDate} and ${endDate}`)
      .groupBy(sql`date_trunc('day', ${orders.createdAt})::date`)
      .orderBy(sql`date_trunc('day', ${orders.createdAt})::date`);

    return revenueStats;
  }

  async getDailyOrderCounts(startDate: Date, endDate: Date) {
    const dailyOrderCounts = await this.drizzle.db
      .select({
        date: sql<string>`date_trunc('day', ${orders.createdAt})::date`,
        count: sql<number>`count(*)`,
      })
      .from(orders)
      .where(sql`${orders.createdAt} between ${startDate} and ${endDate}`)
      .groupBy(sql`date_trunc('day', ${orders.createdAt})::date`)
      .orderBy(sql`date_trunc('day', ${orders.createdAt})::date`);

    return dailyOrderCounts;
  }

  async getDailyOrderTotals(startDate: Date, endDate: Date) {
    const dailyOrderTotals = await this.drizzle.db
      .select({
        date: sql<string>`date_trunc('day', ${orders.createdAt})::date`,
        total: sql<number>`sum("totalPrice")`,
      })
      .from(orders)
      .where(sql`${orders.createdAt} between ${startDate} and ${endDate}`)
      .groupBy(sql`date_trunc('day', ${orders.createdAt})::date`)
      .orderBy(sql`date_trunc('day', ${orders.createdAt})::date`);

    return dailyOrderTotals;
  }

  async getDailyTopSoldProducts(startDate: Date, endDate: Date) {
    const dailyTopSoldProducts = await this.drizzle.db
      .select({
        date: sql<string>`date_trunc('day', ${orders.createdAt})::date`,
        productId: products.id,
        productName: products.name,
        totalSold: sql<number>`sum(order_items.quantity)`
      })
      .from(products)
      .leftJoin(orderItems, sql`products.id = order_items."productId"`)
      .leftJoin(orders, sql`order_items."orderId" = orders.id`)
      .where(sql`${orders.createdAt} between ${startDate} and ${endDate}`)
      .groupBy(sql`date_trunc('day', ${orders.createdAt})::date`, products.id, products.name)
      .orderBy(sql`sum(order_items.quantity) desc`)
      .limit(10);

    return dailyTopSoldProducts;
  }
}
