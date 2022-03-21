import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SecurityService } from '@nx-post/api/data-access-security';
import {
  LoginParamsDto,
  RegisterParamsDto,
  TokenResultDto,
} from '@nx-post/api/shared-data-access-dtos';
import { ApiErrors } from '@nx-post/api/shared-utils-decorators';

@ApiTags('Security')
@ApiErrors()
@Controller('securities')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('register') // POST securities/register
  @ApiCreatedResponse()
  async register(@Body() dto: RegisterParamsDto): Promise<void> {
    return await this.securityService.register(dto);
  }

  @Post('login')
  @ApiCreatedResponse({ type: TokenResultDto })
  async login(@Body() dto: LoginParamsDto): Promise<TokenResultDto> {
    return await this.securityService.login(dto);
  }
}
