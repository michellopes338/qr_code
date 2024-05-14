import { IsAlpha, IsStrongPassword } from 'class-validator';

export class SignIn {
  @IsAlpha()
  username: string;

  @IsStrongPassword()
  password: string;
}
