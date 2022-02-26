import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '@nx-post/api/data-access-auth';
import { UserService } from '@nx-post/api/data-access-user';
import {
  LoginParamsDto,
  RegisterParamsDto,
  TokenResultDto,
} from '@nx-post/api/shared-data-access-dtos';
import { AuthConfig, InjectAuthConfig } from '@nx-post/api/utils-config';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class SecurityService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    @InjectAuthConfig() private authConfig: AuthConfig
  ) {}

  async register(dto: RegisterParamsDto): Promise<void> {
    const salt = await genSalt(this.authConfig.salt);
    dto.password = await hash(dto.password, salt);
    await this.userService.create(dto);
  }

  async login({ username, password }: LoginParamsDto): Promise<TokenResultDto> {
    const user = await this.userService.findByUsername(username);

    if (user == null) {
      throw new NotFoundException(username, 'failed - wrong credentials');
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      throw new BadRequestException(username, 'failed - wrong credentials');
    }

    return await this.authService.createToken(user);
  }
}
