import { IsAlpha, IsStrongPassword } from 'class-validator';

export class SignIn {
  @IsAlpha()
  username: string;

  @IsStrongPassword({ minLength: 8 }, { message: 'Senha muito fraca' })
  password: string;
}
