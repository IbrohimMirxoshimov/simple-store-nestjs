import { sql } from '@vercel/postgres';
import * as bcrypt from 'bcrypt';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '../../modules/db/db.schema';

export async function initialSeed() {
  const db = drizzle(sql, { schema });

  try {
    console.log('Starting database seeding...');

    // Use a transaction for all database operations
    await db.transaction(async (tx) => {
      console.log('Clearing existing data and resetting IDs...');
      try {
        // Clear all tables and reset IDs by using raw SQL with TRUNCATE ... RESTART IDENTITY CASCADE
        await sql`TRUNCATE TABLE "order_items" RESTART IDENTITY CASCADE`;
        await sql`TRUNCATE TABLE "orders" RESTART IDENTITY CASCADE`;
        await sql`TRUNCATE TABLE "products" RESTART IDENTITY CASCADE`;
        await sql`TRUNCATE TABLE "categories" RESTART IDENTITY CASCADE`;
        await sql`TRUNCATE TABLE "banners" RESTART IDENTITY CASCADE`;
        await sql`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
      } catch (error) {
        console.log(
          'Some tables might not exist yet, continuing with seeding...',
        );
      }

      // Hash password for admin
      const saltRounds = 10;
      const adminPassword = await bcrypt.hash('pass123', saltRounds);
      const defaultPassword = await bcrypt.hash('password123', saltRounds);

      console.log('Seeding users...');
      // Seed users and capture the inserted IDs
      const insertedUsers = await tx
        .insert(schema.users)
        .values([
          {
            name: 'Admin User',
            email: 'admin@nt.uz',
            password: adminPassword,
            image: 'https://via.placeholder.com/150',
            role: schema.UserRole.admin,
          },
          {
            name: 'Olim Karimov',
            email: 'olim@example.com',
            password: defaultPassword,
            image: 'https://via.placeholder.com/150',
            role: schema.UserRole.customer,
          },
          {
            name: 'Sora Rahimova',
            email: 'sora@example.com',
            password: defaultPassword,
            image: 'https://via.placeholder.com/150',
            role: schema.UserRole.customer,
          },
        ])
        .returning({ id: schema.users.id });

      console.log('Seeding categories...');
      // Seed categories and capture the inserted IDs
      const categories = [
        { name: 'Elektronika', description: 'Qurilmalar va gadjetlar' },
        { name: 'Kitoblar', description: 'Turli janrdagi kitoblar' },
        { name: 'Kiyim-kechak', description: 'Moda va aksessuarlar' },
        {
          name: "O'yinchoqlar",
          description: "Bolalar va kattalar uchun o'yinchoqlar",
        },
        { name: 'Mebel', description: 'Uy va ofis mebellari' },
      ];

      const insertedCategories = await tx
        .insert(schema.categories)
        .values(categories)
        .returning({ id: schema.categories.id });

      console.log('Seeding products...');
      // Seed products with correct category IDs
      const products = [
        {
          name: 'Smartfon',
          description: 'Eng yangi modeldagi smartfon',
          imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
          price: 79999,
          stock: 20,
          categoryId: insertedCategories[0].id,
        },
        {
          name: 'Noutbuk',
          description: "Ish va o'yin uchun qulay noutbuk",
          imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
          price: 129999,
          stock: 15,
          categoryId: insertedCategories[0].id,
        },
        {
          name: 'Roman kitobi',
          description: 'Mashhur yozuvchidan yangi roman',
          imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
          price: 1999,
          stock: 50,
          categoryId: insertedCategories[1].id,
        },
        {
          name: "Ko'ylak",
          description: "Klassik ko'ylak",
          imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
          price: 4999,
          stock: 30,
          categoryId: insertedCategories[2].id,
        },
        {
          name: "Lego to'plami",
          description: "Bolalar uchun qurilish to'plami",
          imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
          price: 5999,
          stock: 25,
          categoryId: insertedCategories[3].id,
        },
        {
          name: 'Divan',
          description: 'Uy uchun qulay divan',
          imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
          price: 149999,
          stock: 10,
          categoryId: insertedCategories[4].id,
        },
      ];

      const insertedProducts = await tx
        .insert(schema.products)
        .values(products)
        .returning({ id: schema.products.id });

      console.log('Seeding banners...');
      // Seed banners
      await tx.insert(schema.banners).values([
        {
          title: 'Qishki chegirmalar',
          imageUrl: 'https://via.placeholder.com/500',
          isActive: true,
        },
        {
          title: 'Yozgi aksiya',
          imageUrl: 'https://via.placeholder.com/500',
          isActive: true,
        },
      ]);

      console.log('Seeding orders...');
      // Seed some orders
      const orders = [
        {
          customerId: insertedUsers[1].id, // Olim's order
          totalPrice: 84998,
          status: schema.OrderStatus.PENDING,
        },
        {
          customerId: insertedUsers[2].id, // Sora's order
          totalPrice: 129999,
          status: schema.OrderStatus.DELIVERED,
        },
      ];

      const insertedOrders = await tx
        .insert(schema.orders)
        .values(orders)
        .returning({ id: schema.orders.id });

      console.log('Seeding order items...');
      // Seed order items
      const orderItems = [
        {
          orderId: insertedOrders[0].id,
          productId: insertedProducts[0].id, // Smartfon
          quantity: 1,
          price: 79999,
        },
        {
          orderId: insertedOrders[0].id,
          productId: insertedProducts[2].id, // Roman kitobi
          quantity: 2,
          price: 4999,
        },
        {
          orderId: insertedOrders[1].id,
          productId: insertedProducts[1].id, // Noutbuk
          quantity: 1,
          price: 129999,
        },
      ];

      await tx.insert(schema.orderItems).values(orderItems);
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}
