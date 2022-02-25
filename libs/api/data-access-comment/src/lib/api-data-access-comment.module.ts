import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CommentEntity } from '@nx-post/api/shared-data-access-entities';

@Module({
  imports: [MikroOrmModule.forFeature([CommentEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiDataAccessCommentModule {}
