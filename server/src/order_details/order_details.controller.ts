import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';

@Controller('api/v1/order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  // @Get()
  // findAll() {
  //   return this.orderDetailsService.findAll();
  // }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.orderDetailsService.findAll(+id);
  }

  @Get('/waitOrder/:id')
  findAllWaitOrder(@Param('id') id: string) {
    return this.orderDetailsService.findAllWaitOrder(+id);
  }

  @Get('/shipOrder/:id')
  findAllShipOrder(@Param('id') id: string) {
    return this.orderDetailsService.findAllShipOrder(+id);
  }

  @Get('/successOrder/:id')
  findAllSuccessOrder(@Param('id') id: string) {
    return this.orderDetailsService.findAllSuccessOrder(+id);
  }
  @Get('/sucessReview/:id')
  findAllSucessReview(@Param('id') id: string) {
    return this.orderDetailsService.findAllSucessReview(+id);
  }

  @Get('/waitReview/:id')
  findAllWaitReview(@Param('id') id: string) {
    return this.orderDetailsService.findAllWaitReview(+id);
  }

  @Get('/cancerOrder/:id')
  findAllCancerOrder(@Param('id') id: string) {
    return this.orderDetailsService.findAllCancerOrder(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
