import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BannersModule } from './modules/banners/banners.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DrizzleModule } from './modules/db/db.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { PublicModule } from './modules/public/public.module';
import { UsersModule } from './modules/users/users.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    DrizzleModule,
    PublicModule,
    AuthModule,
    BannersModule,
    UsersModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    StatisticsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
