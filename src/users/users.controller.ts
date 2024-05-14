import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './dto/create-user.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.SUPERUSER)
  @Post()
  async create(@Body() bodyUser: UserEntity): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(bodyUser));
  }
}
