import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiDataAccessAuthModule } from '@nx-post/api/data-access-auth';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule],
})
class PassportGlobalModule {}

@Module({
  imports: [PassportGlobalModule, ApiDataAccessAuthModule],
})
export class ApiFeatureAuthModule {}
