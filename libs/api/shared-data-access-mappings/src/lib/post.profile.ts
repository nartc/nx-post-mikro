import {
  createMap,
  extend,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseDto, PostDto } from '@nx-post/api/shared-data-access-dtos';
import {
  BaseEntity,
  PostEntity,
} from '@nx-post/api/shared-data-access-entities';

@Injectable()
export class PostProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        PostEntity,
        PostDto,
        extend(BaseEntity, BaseDto),
        forMember(
          (d) => d.commentsCount,
          mapFrom((s) => s.comments.length)
        ),
        forMember(
          (d) => d.likedByCount,
          mapFrom((s) => s.likedBy.length)
        )
      );
    };
  }
}
