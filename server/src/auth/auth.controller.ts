import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/auth.dtos';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
    ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    const { email } = body;
    /** kiem tra email co ton tai bd hay khong */
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return this.authService.signUp(body);
  }


  @Post('sign-in')
  @HttpCode(201)
  async signIn(@Body() body) {
    console.log("222",body)
    const data = await this.authService.signIn(body);
    return {
      message: 'Sign in successfully',
      ...data,
    };
  }

  // @Post('loginGoogle')
  // async loginGoogle(@Body() body) {
  //   console.log(body)
  // }

  
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
