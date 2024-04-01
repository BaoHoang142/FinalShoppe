import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  @IsNotEmpty()
  quantityOrder: number;

  @IsNumber()
  @IsNotEmpty()
  priceOrder: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  orderId: number;
}
