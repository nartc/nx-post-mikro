import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiDataAccessUserModule } from '@nx-post/api/data-access-user';
import { AuthConfig, authConfig } from '@nx-post/api/utils-config';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [authConfig.KEY],
      useFactory: ({ jwtExpired, jwtSecret }: AuthConfig) => ({
        secret: jwtSecret,
        signOptions: {
          expiresIn: jwtExpired,
        },
      }),
    }),
    ApiDataAccessUserModule,
  ],
  providers: [AuthService, JwtStrategyService],
  exports: [AuthService],
})
export class ApiDataAccessAuthModule {}
