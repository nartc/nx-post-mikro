import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  @AutoMap()
  id!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @AutoMap()
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @AutoMap()
  updatedAt!: Date;
}
