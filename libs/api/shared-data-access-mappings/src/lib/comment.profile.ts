import { createMap, extend, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseDto, CommentDto } from '@nx-post/api/shared-data-access-dtos';
import {
  BaseEntity,
  CommentEntity,
} from '@nx-post/api/shared-data-access-entities';

@Injectable()
export class CommentProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CommentEntity, CommentDto, extend(BaseEntity, BaseDto));
    };
  }
}
