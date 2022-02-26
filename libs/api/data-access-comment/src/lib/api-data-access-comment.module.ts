import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CommentEntity } from '@nx-post/api/shared-data-access-entities';
import { CommentService } from './comment.service';

@Module({
  imports: [MikroOrmModule.forFeature([CommentEntity])],
  providers: [CommentService],
  exports: [CommentService],
})
export class ApiDataAccessCommentModule {}
