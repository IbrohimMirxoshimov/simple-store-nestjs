import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '../../modules/db/db.schema';

export async function generateDailyOrders() {
  const db = drizzle(sql, { schema });

  try {
    console.log('Generating mock orders for the last 30 days...');

    // Fetch all customers (users with customer role)
    const customers = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.role, 'customer'));

    if (customers.length === 0) {
      console.error('No customers found in the database.');
      process.exit(1);
    }

    // Fetch all products
    const products = await db.select().from(schema.products);

    if (products.length === 0) {
      console.error('No products found in the database.');
      process.exit(1);
    }

    // Generate orders for the last 30 days
    const today = new Date();
    let totalOrdersGenerated = 0;

    // Use a transaction for all database operations
    await db.transaction(async (tx) => {
      // Loop through last 30 days
      for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
        const orderDate = new Date();
        orderDate.setDate(today.getDate() - dayOffset);

        // Format date as YYYY-MM-DD for display
        const dateStr = orderDate.toISOString().split('T')[0];

        // Generate between 1 and 10 orders for this day
        const orderCount = Math.floor(Math.random() * 10) + 1;
        console.log(`Generating ${orderCount} orders for ${dateStr}...`);

        for (let i = 0; i < orderCount; i++) {
          // Randomly select a customer
          const randomCustomer =
            customers[Math.floor(Math.random() * customers.length)];

          // Generate between 1 and 5 order items
          const itemCount = Math.floor(Math.random() * 5) + 1;

          // Select random products for this order (avoiding duplicates)
          const shuffledProducts = [...products].sort(
            () => 0.5 - Math.random(),
          );
          const selectedProducts = shuffledProducts.slice(0, itemCount);

          // Calculate total price
          let totalPrice = 0;
          const orderItems = [];

          for (const product of selectedProducts) {
            // Generate random quantity between 1 and 3
            const quantity = Math.floor(Math.random() * 3) + 1;
            const itemPrice = product.price * quantity;
            totalPrice += itemPrice;

            orderItems.push({
              productId: product.id,
              quantity,
              price: itemPrice,
            });
          }

          // Pick a random status
          const statuses = Object.values(schema.OrderStatus);
          const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];

          // Create the order with the specific date
          const [order] = await tx
            .insert(schema.orders)
            .values({
              customerId: randomCustomer.id,
              totalPrice,
              status: randomStatus,
              createdAt: orderDate, // Use the specific date for this order
            })
            .returning({ id: schema.orders.id });

          // Create the order items
          for (const item of orderItems) {
            await tx.insert(schema.orderItems).values({
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            });
          }

          totalOrdersGenerated++;
        }
      }
    });

    console.log(
      `Successfully generated ${totalOrdersGenerated} orders for the last 30 days`,
    );
  } catch (error) {
    console.error('Error generating daily orders:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}
