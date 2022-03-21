import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@nx-post/api/shared-data-access-entities';
import { BaseDto } from '../base.dto';
import { CommentDto } from '../comment/comment.dto';
import { PostDto } from '../post/post.dto';

export class UserDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  username!: string;

  @ApiProperty()
  @AutoMap()
  email!: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @AutoMap(() => String)
  role!: UserRole;

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

  @ApiProperty({ type: () => PostDto, isArray: true })
  @AutoMap(() => [PostDto])
  posts: PostDto[] = [];

  @ApiProperty({ type: () => PostDto, isArray: true })
  @AutoMap(() => [PostDto])
  liked: PostDto[] = [];

  @ApiProperty({ type: () => CommentDto, isArray: true })
  @AutoMap(() => [CommentDto])
  comments: CommentDto[] = [];
}
