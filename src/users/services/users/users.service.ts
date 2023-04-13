import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post, Profile, User } from '../../../typeorm/entities';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from '../../../utils/type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  async findAllUsers() {
    const query = this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.profile', 'profile')
      .innerJoinAndSelect('user.posts', 'posts')
      .select([
        'user.id',
        'user.username',
        'user.createdAt',
        'profile.id',
        'profile.firstName',
        'profile.lastName',
        'profile.dob',
        'profile.createdAt',
        'posts.id',
        'posts.title',
        'posts.createdAt',
      ]);
    return await query.getMany();
  }

  async findUsersById(id: number) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.profile', 'profile')
      .innerJoinAndSelect('user.posts', 'posts')
      .select([
        'user.id',
        'user.username',
        'user.password',
        'user.createdAt',
        'profile.id',
        'profile.firstName',
        'profile.lastName',
        'profile.age',
        'profile.dob',
        'profile.createdAt',
        'posts.id',
        'posts.title',
        'posts.description',
        'posts.createdAt',
      ])
      .where('user.id = :id', { id });
    return await query.getOne();
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, userDetails: UpdateUserParams) {
    return this.userRepository.update(
      { id },
      {
        ...userDetails,
        createdAt: new Date(),
      },
    );
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    userProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile.',
        HttpStatus.BAD_REQUEST,
      );

    const newProfile = this.profileRepository.create({
      ...userProfileDetails,
      createdAt: new Date(),
    });
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPosts(id: number, userPostDetails: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Post.',
        HttpStatus.BAD_REQUEST,
      );

    const newPost = this.postRepository.create({
      ...userPostDetails,
      createdAt: new Date(),
      user: user,
    });
    return this.postRepository.save(newPost);
  }
}
