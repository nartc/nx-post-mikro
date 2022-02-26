import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiExceptionDto } from '@nx-post/api/shared-data-access-dtos';

export function ApiErrors() {
  return applyDecorators(
    ApiNotFoundResponse({ type: ApiExceptionDto, description: 'Not found' }),
    ApiBadRequestResponse({
      type: ApiExceptionDto,
      description: 'Bad Request',
    }),
    ApiInternalServerErrorResponse({
      type: ApiExceptionDto,
      description: 'Internal Server Error',
    }),
    ApiUnauthorizedResponse({
      type: ApiExceptionDto,
      description: 'Unauthorized',
    }),
    ApiForbiddenResponse({ type: ApiExceptionDto, description: 'Forbidden' })
  );
}
