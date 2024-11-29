import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}
  onModuleInit() {
    this.initializeRoles()
  }

  private async initializeRoles() {
    const roles = ['admin', 'user'];

    await Promise.all(
      roles.map(async (roleName) => {
        let existingRole = await this.rolesRepository.findOne({
          where: { role: roleName },
        });

        if (!existingRole) {
          const newRole = this.rolesRepository.create({ role: roleName });
          await this.rolesRepository.save(newRole);
        }
      }),
    );
  }

  async findRoleById(roleId:string):Promise<Role>{
    return this.rolesRepository.findOne({where:{id:roleId}})
  }
  async findAllRoles():Promise<Role[]>{
    return this.rolesRepository.find()
  }
}
