import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: { username: string; email: string; passwordHash: string },
  ): Promise<User[]> {
    return await this.userService.createUser(body);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User | undefined> {
    return this.userService.findByUsername(username);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}