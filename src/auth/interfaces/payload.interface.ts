import { Role } from '@prisma/client';

export interface Payload {
  username: string;
  sub: string;
  role: Role;
}
