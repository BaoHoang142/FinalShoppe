import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { Store } from 'src/stores/entities/store.entity';
import { StoresModule } from 'src/stores/stores.module';
import { StoresService } from 'src/stores/stores.service';


@Module({
  imports: [TypeOrmModule.forFeature([Product,Category,Store]),CategoriesModule,StoresModule],
  controllers: [ProductsController],
  providers: [ProductsService,CategoriesService,StoresService],
  exports: [ProductsService],

})
export class ProductsModule {}
