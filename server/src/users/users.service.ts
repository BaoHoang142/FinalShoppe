import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UserRepos: Repository<User>,
  ) {}

  getUserByEmail(email: string) {
    
    return this.UserRepos.findOne({
      where: {
        email,
      },
    });
  }

  async findByEmail(key: any) {
    console.log(key)
    const user = await this.UserRepos.findOneBy({ email: key });
    return user;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  createUser(user) {
    const newUser = this.UserRepos.createQueryBuilder('user')
      .insert()
      .into(User)
      .values(user)
      .execute();
    return newUser
  }

  async findAll() {
    const users = await this.UserRepos.find();
    return users;
  }

  getUserById(id: any) {
    return this.UserRepos.findOneBy({ userId: id });
  }

  async findOne(id: number) {
    // const userByStoreId = await this.UserRepos.findOne({
    //   relations: ['user'],
    //   where: { userId: id.toString() },
    // });
    // return userByStoreId;
  }

  //search
  async searchUser(key: any) {
    console.log(key);
    const user = await this.UserRepos.createQueryBuilder('user')
      .where('user.userName LIKE :key', { key: `%${key}%` })
      .getMany();
    return user;
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    const { userName, phone, gender, address } = updateUserDto;
    const user = await this.UserRepos.update(id, {
      userName,
      phone,
      gender,
      address,
    });
    return {
      message: 'User updated successfully',
      user,
    };
  }
  updateAvatar(id: number, updateUserDto: UpdateUserDto) {
    const { avatarUrl } = updateUserDto;
    return this.UserRepos.update(id, {
      avatarUrl,
    });
  }

  async updateStatus(id: any, updateUserDto: UpdateUserDto) {
    const { statusUser } = updateUserDto;
    const user = await this.UserRepos.update(id, {
      statusUser: statusUser,
    });
    return {
      message: 'User updated successfully',
      user,
    };
  }

  async resetPassword(id: any, updateUserDto: any) {
    const { password } = updateUserDto;
    console.log(password);
    const hashPassword = await argon2.hash(password);
    const user = await this.UserRepos.update(id, {
      password: hashPassword,
    });
    return {
      message: 'User updated successfully',
      user,
    };
  }

  async deletePassword(id: any) {
    const user = await this.UserRepos.update(id, {
      password: null,
    });
    return {
      message: 'User updated successfully',
      user,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
