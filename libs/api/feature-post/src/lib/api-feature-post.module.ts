import { Module } from '@nestjs/common';
import { ApiDataAccessPostModule } from '@nx-post/api/data-access-post';
import { PostController } from './post.controller';

@Module({
  imports: [ApiDataAccessPostModule],
  controllers: [PostController],
})
export class ApiFeaturePostModule {}
