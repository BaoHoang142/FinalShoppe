import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("search")
  async searchUser(@Query('key') key: any) {
    return this.productsService.searchProduct(key);
  }

  @Post()
  create(@Body() Body: CreateProductDto) {
    return this.productsService.create(Body);
  }
  @Get('category/:id')
  findProductByCategory(@Param('id') id: string) {
    console.log(id);
    return this.productsService.findProductByCategoryService(+id);
  }

  @Get('productDetail/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(+id);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get('admin/findAll')
  async findAllProduct() {
    return await this.productsService.findAllProductAdmin();
  }

  @Get('hotProduct')
  findByQuantity() {
    return this.productsService.findByQuantity();
  }

  // lay review
  @Get('review/:id')
  getProductReviews(@Param('id') id: string) {
    console.log(11111);
    return this.productsService.getProductReviews(+id);
  }

  @Get('store/:id')
  findProductByStore(@Param('id') id: number) {
    return this.productsService.findByStoreId(+id);
  }

  // lay product theo store
  @Get('storeId/products/:id')
  getProductsByStoreId(@Param('id') id: number) {
    console.log(id);
    return this.productsService.getProductsByStoreId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const { productName, price, description, quantity, categoryId } =
      updateProductDto;
    console.log(productName, price, description, quantity, categoryId);
    return this.productsService.update(+id, updateProductDto);
  }

  @Patch('status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateStatus(+id, updateProductDto);
  }

  @Patch('admin/statusProduct')
  updateAdminStatusProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateAdminStatusProduct(updateProductDto);
  }
  
  @Patch('quantity/:id')
  updateQuantity(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateQuantity(+id, updateProductDto);
  }

  @Patch('quantitySole/:id')
  updateQuantitySole(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateQuantitySole(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
