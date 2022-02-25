import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentParamsDto {
  @ApiProperty()
  postId!: string;

  @ApiProperty()
  text!: string;
}
