import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from '../../dots/create-user.dto';
import { UpdateUserDto } from '../../dots/update-user.dto';
import { CreateUserProfileDto } from './../../dots/create-user-profile.dto';
import { UsersService } from '../../services/users/users.service';
import { CreateUserPostDto } from 'src/users/dots/create-user-post.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.findUsers();
    return users;
  }

  @Get('allUser')
  async getAllUsers() {
    const users = await this.usersService.findAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUsersById(id);
    return user;
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }

  @Post('create/:id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.usersService.createUserProfile(id, createUserProfileDto);
  }

  @Post('create/:id/posts')
  createUserPosts(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.usersService.createUserPosts(id, createUserPostDto);
  }
}
