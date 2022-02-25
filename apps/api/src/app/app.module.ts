import { CamelCaseNamingConvention } from '@automapper/core';
import { mikro } from '@automapper/mikro';
import { AutomapperModule } from '@automapper/nestjs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ApiFeatureConfigModule } from '@nx-post/api/feature-config';
import { ApiFeaturePostModule } from '@nx-post/api/feature-post';
import { DbConfig, dbConfig } from '@nx-post/api/utils-config';

@Module({
  imports: [
    AutomapperModule.forRoot({
      singular: true,
      options: [
        {
          name: 'mapper',
          pluginInitializer: mikro,
          namingConventions: new CamelCaseNamingConvention(),
        },
      ],
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
    ApiFeaturePostModule,
  ],
})
export class AppModule {}
