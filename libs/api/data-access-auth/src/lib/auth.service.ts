import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@nx-post/api/data-access-user';
import {
  AuthUserDto,
  TokenResultDto,
  UserInformationDto,
} from '@nx-post/api/shared-data-access-dtos';
import { UserEntity } from '@nx-post/api/shared-data-access-entities';
import { AuthConfig, InjectAuthConfig } from '@nx-post/api/utils-config';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    @InjectAuthConfig() private authConfig: AuthConfig,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async createToken(user: UserEntity): Promise<TokenResultDto> {
    const tokenResult = new TokenResultDto();
    tokenResult.token = await this.jwtService.signAsync({
      email: user.email,
      username: user.username,
      role: user.role,
    });
    tokenResult.user = this.mapper.map(user, UserInformationDto, UserEntity);
    return tokenResult;
  }

  async verify<
    TPayload extends Record<string, unknown> = Record<string, unknown>
  >(token: string): Promise<TPayload> {
    try {
      return await this.jwtService.verifyAsync<TPayload>(token);
    } catch (e) {
      throw new InternalServerErrorException(token, 'failed - verifying token');
    }
  }

  async validateUser({ username }: JwtPayload): Promise<AuthUserDto> {
    const user = await this.userService.findByUsername(username);
    return this.mapper.map(user, AuthUserDto, UserEntity);
  }
}
