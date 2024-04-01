import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/author.guard';

const PUBLISH_KEY = 'isPublic';
export const Publish = () => SetMetadata(PUBLISH_KEY, true);
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("search")
  async searchUser(@Query('key') key: any) {
    return this.usersService.searchUser(key);
  }
  @Get("email")
  async findByEmail(@Query('key') key: any) {
    console.log(key)
    return this.usersService.findByEmail(key);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get("list")
  // @UseGuards(AuthGuard) // ktra xem có tài khoản hay chưa
  async findAll() {
    return this.usersService.findAll();
  }
  
  @Publish()
  @Get(':id')
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(+userId);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch("avatar/:id")
  updateAvatar(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateAvatar(+id, updateUserDto);
  }

  @Patch("status/:id")
  updateStatus(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateStatus(+id, updateUserDto);
  }

  @Patch("resetPassword/:id")
  resetPassword(@Param('id') id: string, @Body() updateUserDto: any) {
    console.log(id,updateUserDto);
    return this.usersService.resetPassword(+id, updateUserDto);

  }

  @Delete("deletePassword/:id")
  deletePassword(@Param('id') id: string) {
    return this.usersService.deletePassword(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
