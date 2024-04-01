import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    quantitySole: number;

    @IsNumber()
    @IsNotEmpty()
    statusProduct: number;

    @IsString()
    @IsNotEmpty()
    imageProduct: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

}
