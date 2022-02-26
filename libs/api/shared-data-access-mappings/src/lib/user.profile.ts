import { Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  AuthUserDto,
  BaseDto,
  UserDto,
  UserInformationDto,
} from '@nx-post/api/shared-data-access-dtos';
import {
  BaseEntity,
  UserEntity,
} from '@nx-post/api/shared-data-access-entities';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      const baseMapping = mapper.getMapping(BaseEntity, BaseDto);
      mapper.createMap(UserEntity, UserDto, { extends: [baseMapping] });
      mapper.createMap(UserEntity, UserInformationDto, {
        extends: [baseMapping],
      });
      mapper.createMap(UserEntity, AuthUserDto, { extends: [baseMapping] });
    };
  }
}
