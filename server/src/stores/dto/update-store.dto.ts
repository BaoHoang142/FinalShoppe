import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
    @IsNotEmpty()
    @IsString()
    storeId: string;
  
    
    @IsNotEmpty()
    @IsString()
    storeName: string;
  
    @IsNotEmpty()
    @IsString()
    addressStore: string;
  
    @IsNotEmpty()
    @IsString()
    phone: string;
  
    @IsNotEmpty()
    @IsString()
    emailStore: string;

    @IsNotEmpty()
    @IsNumber()
    statusStore: number;
}
