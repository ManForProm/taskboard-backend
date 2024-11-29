import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: any): Promise<User[]> {
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id:userId } });
  }

  async delete(userId: string): Promise<void> {
    this.userRepository.delete(userId);
  }

  async updateUser(
    userId: string,
    updatedData: Partial<User>,
  ): Promise<UpdateResult> {
    return await this.userRepository.update({ id: userId }, updatedData);
  }
}
