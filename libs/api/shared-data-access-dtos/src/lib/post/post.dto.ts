import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';
import { CommentDto } from '../comment/comment.dto';
import { UserInformationDto } from '../user/user-information.dto';

export class PostDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  text!: string;

  @ApiProperty({ type: () => UserInformationDto })
  @AutoMap({ typeFn: () => UserInformationDto })
  author!: UserInformationDto;

  @ApiProperty({ type: () => CommentDto, isArray: true })
  @AutoMap({ typeFn: () => CommentDto })
  comments: CommentDto[] = [];

  @ApiProperty({ type: Number })
  @AutoMap({ typeFn: () => Number })
  commentsCount = 0;

  @ApiProperty({ type: () => UserInformationDto, isArray: true })
  @AutoMap({ typeFn: () => UserInformationDto })
  likedBy: UserInformationDto[] = [];

  @ApiProperty({ type: Number })
  @AutoMap({ typeFn: () => Number })
  likedByCount = 0;
}
