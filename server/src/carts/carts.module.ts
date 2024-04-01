import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Store } from 'src/stores/entities/store.entity';
import { StoresModule } from 'src/stores/stores.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,Product,User,Category,Store]),ProductsModule,UsersModule,StoresModule,CategoriesModule],
  controllers: [CartsController],
  providers: [CartsService,ProductsService,UsersService],
})
export class CartsModule {

}
