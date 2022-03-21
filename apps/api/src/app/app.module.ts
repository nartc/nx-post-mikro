import { CamelCaseNamingConvention } from '@automapper/core';
import { mikro } from '@automapper/mikro';
import { AutomapperModule } from '@automapper/nestjs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ApiFeatureAuthModule } from '@nx-post/api/feature-auth';
import { ApiFeatureCommentModule } from '@nx-post/api/feature-comment';
import { ApiFeatureConfigModule } from '@nx-post/api/feature-config';
import { ApiFeaturePostModule } from '@nx-post/api/feature-post';
import { ApiFeatureSecurityModule } from '@nx-post/api/feature-security';
import { ApiFeatureUserModule } from '@nx-post/api/feature-user';
import {
  BaseProfile,
  CommentProfile,
  PostProfile,
  UserProfile,
} from '@nx-post/api/shared-data-access-mappings';
import { DbConfig, dbConfig } from '@nx-post/api/utils-config';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: mikro(),
      namingConventions: new CamelCaseNamingConvention(),
    }),
    MikroOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (dbConfig: DbConfig) => ({
        dbName: dbConfig.dbName,
        clientUrl: dbConfig.uri,
        autoLoadEntities: true,
        type: 'mongo',
      }),
    }),
    ApiFeatureConfigModule,
    ApiFeatureAuthModule,
    ApiFeatureUserModule,
    ApiFeaturePostModule,
    ApiFeatureCommentModule,
    ApiFeatureSecurityModule,
  ],
  providers: [BaseProfile, UserProfile, PostProfile, CommentProfile],
})
export class AppModule {}
