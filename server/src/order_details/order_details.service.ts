import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { OrderDetail } from './entities/order_detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(@InjectRepository(OrderDetail) private orderDetailRepos: Repository<OrderDetail>) {}
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const {productId,orderId,quantityOrder,priceOrder} = createOrderDetailDto
    console.log(productId,orderId,quantityOrder,priceOrder)
    const orderDetail:DeepPartial<OrderDetail> = {
      product: {productId: productId.toString()},
      quantityOrder: quantityOrder,
      priceOrder: priceOrder,
      order: {orderId: orderId.toString()}
    }
    const newOrderDetail = await this.orderDetailRepos.create(orderDetail);
    return await this.orderDetailRepos.save(newOrderDetail);
  }

  // findAll() {
  //   return `This action returns all orderDetails`;
  // }

  async findAll(id: number) {
    const allOrder = await this.orderDetailRepos.createQueryBuilder('orderDetail')
    .innerJoinAndSelect('orderDetail.product', 'product')
    .innerJoinAndSelect('orderDetail.order', 'order')
    .innerJoinAndSelect('order.store', 'store')
    .innerJoinAndSelect('order.user', 'user')
    .where('order.user.userId = :id', { id: id.toString() })
    .orderBy('order.orderId', 'DESC')
    .getMany()
    return allOrder
  }
  async findAllWaitOrder(id: any) {
    const allOrder = await this.orderDetailRepos.createQueryBuilder('orderDetail')
    .innerJoinAndSelect('orderDetail.product', 'product')
    .innerJoinAndSelect('orderDetail.order', 'order')
    .innerJoinAndSelect('order.store', 'store')
    .innerJoinAndSelect('order.user', 'user')
    .where('order.user.userId = :id', { id: id.toString() })
    .andWhere('order.statusOrder = :status', { status: 1 })
    .getMany()
    return allOrder
    
  }
  async findAllShipOrder(id: any) {
    const allOrder = await this.orderDetailRepos.createQueryBuilder('orderDetail')
    .innerJoinAndSelect('orderDetail.product', 'product')
    .innerJoinAndSelect('orderDetail.order', 'order')
    .innerJoinAndSelect('order.store', 'store')
    .innerJoinAndSelect('order.user', 'user')
    .where('order.user.userId = :id', { id: id.toString() })
    .andWhere('order.statusOrder = :status', { status: 2 })
    .getMany()
    return allOrder
    
  }

  
  
  
  async findAllSuccessOrder(id: any) {
    const allOrder = await this.orderDetailRepos.createQueryBuilder('orderDetail')
    .innerJoinAndSelect('orderDetail.product', 'product')
    .innerJoinAndSelect('orderDetail.order', 'order')
    .innerJoinAndSelect('order.store', 'store')
    .innerJoinAndSelect('order.user', 'user')
    .where('order.user.userId = :id', { id: id.toString() })
    .andWhere('order.statusOrder = :status', { status: 3 })
    .getMany()
    return allOrder
  }

  
  async findAllSucessReview(id: any) {
    const allOrder = await this.orderDetailRepos.createQueryBuilder('orderDetail')
    .innerJoinAndSelect('orderDetail.product', 'product')
    .innerJoinAndSelect('orderDetail.order', 'order')
    .innerJoinAndSelect('order.store', 'store')
    .innerJoinAndSelect('order.user', 'user')
    .where('order.user.userId = :id', { id: id.toString() })
    .andWhere('order.statusOrder = :status', { status: 4 })
    .getMany()
    return allOrder
  }

  
  async findAllWaitReview(id: any) {
    const allOrder = await this.orderDetailRepos.createQueryBuilder('orderDetail')
    .innerJoinAndSelect('orderDetail.product', 'product')
    .innerJoinAndSelect('orderDetail.order', 'order')
    .innerJoinAndSelect('order.store', 'store')
    .innerJoinAndSelect('order.user', 'user')
    .where('order.user.userId = :id', { id: id.toString() })
    .andWhere('order.statusOrder = :status', { status: 5 })
    .getMany()
    return allOrder
  }


  async findAllCancerOrder(id: any) {
    const allOrder = await this.orderDetailRepos.createQueryBuilder('orderDetail')
    .innerJoinAndSelect('orderDetail.product', 'product')
    .innerJoinAndSelect('orderDetail.order', 'order')
    .innerJoinAndSelect('order.store', 'store')
    .innerJoinAndSelect('order.user', 'user')
    .where('order.user.userId = :id', { id: id.toString() })
    .andWhere('order.statusOrder = :status', { status: 0 })
    .getMany()
    return allOrder
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
