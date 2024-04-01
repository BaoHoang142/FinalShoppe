import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('api/v1/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    const {quantityCart,userId,productId} = createCartDto
    return this.cartsService.create(quantityCart,+userId,+productId);
  }

  @Get("list/:id")
  findAll(@Param("id") id: string) {
    console.log("333444",id)
    return this.cartsService.findAll(+id);
  }


  @Get(':userId/:productId')
  findOne(@Param('userId') userId: string,@Param('productId') productId: string) {
    return this.cartsService.findOne(userId,productId);
  }

 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cartsService.remove(id);
  }
}
