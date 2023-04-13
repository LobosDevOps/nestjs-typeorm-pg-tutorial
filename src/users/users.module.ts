import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User, Profile, Post } from '../typeorm/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
