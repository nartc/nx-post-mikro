import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from '@nx-post/api/shared-data-access-entities';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiDataAccessUserModule {}
