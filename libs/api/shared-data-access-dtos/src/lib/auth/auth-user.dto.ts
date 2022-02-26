import { AutoMap } from '@automapper/classes';
import { UserRole } from '@nx-post/api/shared-data-access-entities';
import { BaseDto } from '../base.dto';

export class AuthUserDto extends BaseDto {
  @AutoMap()
  username!: string;
  @AutoMap()
  email!: string;
  @AutoMap({ typeFn: () => String })
  role!: UserRole;
}
