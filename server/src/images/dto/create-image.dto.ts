import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateImageDto {
    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsNumber()
    @IsNotEmpty()
    imageId: number;
}
