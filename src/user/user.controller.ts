import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
  ) {}

  //should be deleted
  // @Post()
  // async createUser(
  //   @Body() body: { username: string; email: string; passwordHash: string },
  // ): Promise<User[]> {
  //   return await this.userService.createUser(body);
  // }

  @Put(':userId')
  async updateUser(
    @Param('userId') id: string,
    @Body() updatedData: { username: string; email: string; roleId: string },
  ): Promise<User | undefined> {
    const role = await this.rolesService.findRoleById(updatedData.roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    const updatedDataWithRole = {
      username: updatedData.username,
      email: updatedData.email,
      role,
    };
    await this.userService.updateUser(id, updatedDataWithRole);
    return this.userService.findById(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  //Roles

  @Get('/roles')
  async findAllRoles():Promise<Role[]>{
    return this.rolesService.findAllRoles()
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<User | undefined> {
    return this.userService.findById(userId);
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User | undefined> {
    return this.userService.findByUsername(username);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') id: string): Promise<void> {
    await this.userService.delete(id);
  }


}
