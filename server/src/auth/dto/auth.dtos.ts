import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
export class SignUpDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  userName: string;

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

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsInt()
  role?: number;
}
