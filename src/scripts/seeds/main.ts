import * as dotenv from 'dotenv';
import { initialSeed } from './initial-seed';

dotenv.config();

function mainSeeder() {
  initialSeed();
}

mainSeeder();
