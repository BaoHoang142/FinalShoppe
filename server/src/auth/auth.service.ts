import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { SignUpDto } from './dto/auth.dtos';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const { password, ...rest } = body;
    /** logic max hoa password */
    const hashPassword = await argon2.hash(password);

    const newUser = {
      ...rest,
      password: hashPassword,
    };

    await this.userService.createUser({ ...newUser });
    return {
      message: 'User created successfully',
    };
  }

  async signIn(userInfo) {
    /** check thong tin user */
    const user = await this.userService.getUserByEmail(userInfo.email);
    const isMatch =
      user && (await argon2.verify(user.password, userInfo.password));
    if (!user || !isMatch) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      token: await this.generateAccessToken({
        email: user.email,
        id: user.userId,
        roles: user.role,
        userName: user.userName,
      }),
      user,
    };
  }

  async generateAccessToken(payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: 'token',
    });
  }

  verifyAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: 'token',
    });
  }

  

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
