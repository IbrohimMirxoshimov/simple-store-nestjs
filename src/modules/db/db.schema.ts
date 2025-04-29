import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

// Role enum for users
export enum UserRole {
  customer = 'customer',
  admin = 'admin',
}

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  image: text('image'),
  phone: text('phone'),
  role: text().default(UserRole.customer).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type UserInsert = typeof users.$inferInsert;

// Categories table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

// Products table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
  categoryId: integer('categoryId').references(() => categories.id),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  imageUrl: text('imageUrl').notNull(),
});

// Banners table
export const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageUrl: text('imageUrl').notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerId: integer('customerId')
    .notNull()
    .references(() => users.id),
  totalPrice: integer('totalPrice').notNull(),
  status: text('status').default(OrderStatus.PENDING).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

// Order Items table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('orderId')
    .notNull()
    .references(() => orders.id, {
      onDelete: 'cascade',
    }),
  productId: integer('productId')
    .notNull()
    .references(() => products.id),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
});
