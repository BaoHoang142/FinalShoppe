import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private OrderRepos: Repository<Order>) {}
  async create(createOrderDto: CreateOrderDto) {
    const {
      addressOrder,
      nameOrder,
      statusOrder,
      totalPrice,
      phoneOrder,
      userId,
      storeId,
    } = createOrderDto;

    // Tạo một đối tượng DeepPartial<Order> để truyền vào phương thức OrderRepos.create()
    const orderPartial: DeepPartial<Order> = {
      addressOrder: addressOrder,
      nameOrder: nameOrder,
      statusOrder: statusOrder,
      totalPrice: totalPrice,
      phoneOrder: phoneOrder,
      user: { userId: userId.toString() },
      store: { storeId: storeId.toString() },
    };
    // Sử dụng đối tượng orderPartial đã tạo để tạo đơn hàng
    const order = await this.OrderRepos.create(orderPartial);
    const newOrder = await this.OrderRepos.save(order);
    return {
      message: 'Đơn hàng đã được tạo',
      newOrder,
      order: order,
    };
  }

  findAll() {
    return `This action returns all orders`;
  }
  async findOrdersByStore (id: any) {
    console.log(id)
    const orders = await this.OrderRepos
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.store', 'store')
    .leftJoinAndSelect('order.user', 'user')
    .leftJoinAndSelect('order.orderDetails', 'orderDetails')
    .leftJoinAndSelect('orderDetails.product', 'product')
    .where('store.storeId = :id', { id })
    .orderBy('order.orderId', 'DESC')
    .getMany();
    
    return orders
    
  }
  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const {statusOrder} = updateOrderDto
    const order = await this.OrderRepos.update({orderId: id.toString()}, {statusOrder: statusOrder});
    return order
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
