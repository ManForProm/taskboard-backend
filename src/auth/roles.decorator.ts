import { SetMetadata } from '@nestjs/common';


// for adding roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

//example

/* 
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('admin')
export class AdminController {
  @Get()
  @Roles('admin') // Только для роли 'admin'
  @UseGuards(RolesGuard)
  getAdminData() {
    return 'Admin access granted';
  }
}
  */
