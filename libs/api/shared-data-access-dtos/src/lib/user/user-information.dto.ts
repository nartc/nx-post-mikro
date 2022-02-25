import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserInformationDto {
  @ApiProperty()
  @AutoMap()
  id!: string;

  @ApiProperty()
  @AutoMap()
  username!: string;

  @ApiProperty()
  @AutoMap()
  email!: string;

  @ApiProperty()
  @AutoMap()
  name?: string;

  @ApiProperty()
  @AutoMap()
  avatarUrl?: string;

  @ApiProperty()
  @AutoMap()
  bio?: string;

  @ApiProperty()
  @AutoMap()
  location?: string;
}
