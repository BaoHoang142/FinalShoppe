import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmpty()
  fullName: string;

  @IsEmpty()
  avatarUrl: string;

  @IsEmpty()
  address: string;

  @IsEmpty()
  gender: string;

  @IsEmpty()
  birthDay: string;

  @IsNumber()
  @IsNotEmpty()
  statusUser: number;
}
