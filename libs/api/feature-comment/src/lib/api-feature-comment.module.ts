import { Module } from '@nestjs/common';
import { ApiDataAccessCommentModule } from '@nx-post/api/data-access-comment';

@Module({
  imports: [ApiDataAccessCommentModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiFeatureCommentModule {}
