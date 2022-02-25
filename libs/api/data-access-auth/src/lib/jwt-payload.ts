import { UserRole } from '@nx-post/api/shared-data-access-entities';

export interface JwtPayload {
  email: string;
  username: string;
  role: UserRole;
}
