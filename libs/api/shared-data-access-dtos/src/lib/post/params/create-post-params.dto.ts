import { ApiProperty } from '@nestjs/swagger';

export class CreatePostParamsDto {
  @ApiProperty()
  text!: string;
}
