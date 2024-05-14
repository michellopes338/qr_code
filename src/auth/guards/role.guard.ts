import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { ROLES_KEY } from 'src/decorators/roles.decorators';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

ConfigModule.forRoot();
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const required_roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const token = this.extract_token_from_header(request);

    if (!required_roles) return true;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
        ignoreExpiration: true,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const user = request.user;

    // console.log(user);

    const database_user = await this.usersService.findOneByName(user.username);

    return required_roles.some((role) => database_user.role?.includes(role));
  }

  private extract_token_from_header(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
