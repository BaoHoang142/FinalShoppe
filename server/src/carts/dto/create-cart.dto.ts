import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    @IsNumber()
    @IsNotEmpty()
    cartId:number;

    @IsNumber()
    @IsNotEmpty()
    quantityCart:number;

    @IsString()
    @IsNotEmpty()
    userId:string;

    @IsString()
    @IsNotEmpty()
    productId:string;


}
