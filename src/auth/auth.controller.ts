import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn } from './dto/signIn.dto';
import { Public } from 'src/decorators/public.decorators';
import { JwtRefreshGuard } from './guards/refresh.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signIn: SignIn) {
    return await this.authService.signIn(signIn.username, signIn.password);
  }

  @Public()
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async update_refresh_token(@Request() req: any) {
    const { is_refresh_token_valid, ...user } = req.user;

    if (!is_refresh_token_valid) {
      await this.usersService.pop_refresh_token(req.user.user.id);
      throw new ForbiddenException();
    }

    const new_access_token = await this.authService.gen_access_token(
      user.user.username,
      user.user.id,
      user.user.role,
    );

    const new_refresh_token = await this.authService.gen_refresh_token(
      user.user.username,
      user.user.id,
      user.user.role,
    );

    return { new_access_token, new_refresh_token };
  }
}
