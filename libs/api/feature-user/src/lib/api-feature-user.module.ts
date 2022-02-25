import { Module } from '@nestjs/common';
import { ApiDataAccessUserModule } from '@nx-post/api/data-access-user';

@Module({
  imports: [ApiDataAccessUserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiFeatureUserModule {}
