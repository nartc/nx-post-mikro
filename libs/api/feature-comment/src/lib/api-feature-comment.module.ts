import { Module } from '@nestjs/common';
import { ApiDataAccessCommentModule } from '@nx-post/api/data-access-comment';
import { CommentController } from './comment.controller';

@Module({
  imports: [ApiDataAccessCommentModule],
  controllers: [CommentController],
})
export class ApiFeatureCommentModule {}
