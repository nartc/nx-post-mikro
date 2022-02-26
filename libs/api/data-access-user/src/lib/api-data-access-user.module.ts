import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from '@nx-post/api/shared-data-access-entities';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class ApiDataAccessUserModule {}
