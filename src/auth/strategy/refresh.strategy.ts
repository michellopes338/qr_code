import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { Payload } from '../interfaces/payload.interface';
import { UsersService } from 'src/users/users.service';

ConfigModule.forRoot();
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt_refresh_token',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const refresh_token = request.headers.refresh;
          if (!refresh_token) {
            throw new BadRequestException('Token não encontrado');
          }

          return refresh_token.toString();
        },
      ]),
      secretOrKey: process.env.SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Payload) {
    const refresh_token: string = request.headers.refresh.toString();
    const is_refresh_token_valid =
      await this.authService.validate_refresh_token(
        refresh_token,
        payload.username,
      );

    if (!is_refresh_token_valid) {
      await this.usersService.pop_refresh_token(payload.sub);
      throw new ForbiddenException('Erro inesperado');
    }

    return {
      is_refresh_token_valid,
      user: { username: payload.username, id: payload.sub, role: payload.role },
    };
  }
}
