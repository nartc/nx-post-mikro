import { ApiProperty } from '@nestjs/swagger';
import { UserInformationDto } from '../user/user-information.dto';

export class TokenResultDto {
  @ApiProperty()
  token!: string;
  @ApiProperty({ type: () => UserInformationDto })
  user!: UserInformationDto;
}
