import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
    @IsNumber()
    @IsNotEmpty()
    cartId:number;

    @IsNumber()
    @IsNotEmpty()
    quantityCart:number;

    @IsNumber()
    @IsNotEmpty()
    quantitySole:number;

    @IsString()
    @IsNotEmpty()
    userId:string;

    @IsString()
    @IsNotEmpty()
    productId:string;

    
}
