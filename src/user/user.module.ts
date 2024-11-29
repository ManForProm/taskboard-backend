import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role])],
  providers: [UserService, RolesService],
  exports:[UserService,TypeOrmModule],
  controllers: [UserController]
})
export class UserModule {}
