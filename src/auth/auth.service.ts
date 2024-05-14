import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    const user_is_valid =
      user && (await bcrypt.compare(password, user.password));

    if (user_is_valid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user_without_password } = user;

      const access_token = await this.gen_access_token(
        user_without_password.username,
        user_without_password.id,
        user_without_password.role,
      );
      const refresh_token = await this.gen_refresh_token(
        user_without_password.username,
        user_without_password.id,
        user_without_password.role,
      );

      this.userService.save_refresh_token(
        refresh_token,
        user_without_password.id,
      );

      return { access_token, refresh_token };
    }

    return null;
  }

  async gen_access_token(username: string, sub: string, role) {
    const payload = { username, sub, role };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '1m',
    });
  }

  async gen_refresh_token(username: string, sub: string, role) {
    const payload = { username, sub, role, date_login: new Date() };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '5d',
    });
  }

  async validate_refresh_token(refresh_token: string, username: string) {
    const user = await this.userService.findOneByName(username);

    if (user.refresh_token === null) {
      return null;
    }

    return await bcrypt.compare(refresh_token, user.refresh_token);
  }
}
