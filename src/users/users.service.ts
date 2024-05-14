import { BadRequestException, Injectable } from '@nestjs/common';
import { Admins } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async user_exist(username: string, email: string) {
    return !!(await this.prisma.admins.findFirst({
      where: { username, email },
    }));
  }

  async create(user: UserEntity): Promise<UserEntity> {
    if (await this.user_exist(user.username, user.email)) {
      throw new BadRequestException('Usuario já existe');
    }

    const { password, ...user_without_password } = user;
    const hashed_password = await bcrypt.hash(password, 12);
    const new_user = await this.prisma.admins.create({
      data: { ...user_without_password, password: hashed_password },
    });

    return new_user;
  }

  async findOneByName(username: string): Promise<Admins | undefined> {
    return await this.prisma.admins.findFirst({ where: { username } });
  }

  async store_refresh_token(refresh_token: string, id: string) {
    return await this.prisma.admins.update({
      where: { id },
      data: { refresh_token },
    });
  }

  async save_refresh_token(refresh_token: string, id: string) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 12);
    await this.prisma.admins.update({
      where: { id },
      data: { refresh_token: hashed_refresh_token },
    });
  }

  async pop_refresh_token(id: string) {
    this.prisma.admins.update({ where: { id }, data: { refresh_token: null } });
  }
}
