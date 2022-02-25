import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';
import { UserInformationDto } from '../user/user-information.dto';

export class CommentDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  text!: string;

  @ApiProperty({ type: () => UserInformationDto })
  @AutoMap({ typeFn: () => UserInformationDto })
  author!: UserInformationDto;

  @ApiProperty()
  @AutoMap()
  postId!: string;
}
