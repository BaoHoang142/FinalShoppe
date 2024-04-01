
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  addressOrder: string;

  @IsString()
  @IsNotEmpty()
  nameOrder: string;

  @IsNumber()
  @IsNotEmpty()
  statusOrder: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  phoneOrder: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}
