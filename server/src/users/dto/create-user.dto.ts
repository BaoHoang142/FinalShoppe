import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
}
