import * as dotenv from 'dotenv';
import { generateDailyOrders } from './generate-daily-orders';

dotenv.config();

function mainSeeder() {
  generateDailyOrders();
}

mainSeeder();
