import { Exclude } from 'class-transformer';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class UserEntity {
  @Exclude({ toPlainOnly: true })
  id: string;

  @Length(8, 64)
  username: string;

  @IsEmail()
  email: string;

  @Exclude({ toPlainOnly: true })
  @IsStrongPassword()
  password: string;

  @Exclude({ toPlainOnly: true })
  @Exclude()
  role: any;

  @Exclude()
  refresh_token: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
