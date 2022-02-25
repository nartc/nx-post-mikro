import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig, AppConfig } from '@nx-post/api/utils-config';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>(appConfig.KEY);

  app.enableCors();
  app.enableShutdownHooks();

  app.use(compression());
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Post API')
    .setDescription('API documentation for Post')
    .setVersion('1.0.0')
    .addServer(`${config.domain}`, 'Development API')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(config.port, () => {
    Logger.log(
      'Listening at ' + config.domain + '/' + globalPrefix,
      'NestApplication'
    );
    Logger.log(
      `Swagger Docs enabled: ${config.domain}/${globalPrefix}/docs`,
      'NestApplication'
    );
  });
}

void bootstrap();
