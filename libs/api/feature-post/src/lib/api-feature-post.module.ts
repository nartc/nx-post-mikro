import { Module } from '@nestjs/common';
import { ApiDataAccessPostModule } from '@nx-post/api/data-access-post';

@Module({
  imports: [ApiDataAccessPostModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiFeaturePostModule {}
