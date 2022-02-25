import { AutoMap } from '@automapper/classes';
import { UserRole } from '@nx-post/api/shared-data-access-entities';

export class AuthUserDto {
  @AutoMap()
  username!: string;
  @AutoMap()
  email!: string;
  @AutoMap({ typeFn: () => String })
  role!: UserRole;
}
