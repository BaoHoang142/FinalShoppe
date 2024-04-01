import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Store } from 'src/stores/entities/store.entity';
import { StoresModule } from 'src/stores/stores.module';
import { StoresService } from 'src/stores/stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order,User,Store]),UsersModule,StoresModule],
  controllers: [OrdersController],
  providers: [OrdersService,UsersService,StoresService],
})
export class OrdersModule {}
