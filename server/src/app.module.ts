import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { OrdersModule } from './orders/orders.module';
import { StoresModule } from './stores/stores.module';
import { ImagesModule } from './images/images.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { User } from './users/entities/user.entity';
import { Store } from './stores/entities/store.entity';
import { Order } from './orders/entities/order.entity';
import { OrderDetail } from './order_details/entities/order_detail.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { Image } from './images/entities/image.entity';
import { Review } from './reviews/entities/review.entity';
import { AuthModule } from './auth/auth.module';
import { CartsModule } from './carts/carts.module';
import { Cart } from './carts/entities/cart.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'shoppemd5',
    entities: [User,Store,Order,OrderDetail,Product,Category,Image,Review,Cart],
    synchronize: true,

  }), UsersModule, ProductsModule, OrderDetailsModule, OrdersModule, StoresModule, ImagesModule, ReviewsModule, CategoriesModule, AuthModule, CartsModule,CartsModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
