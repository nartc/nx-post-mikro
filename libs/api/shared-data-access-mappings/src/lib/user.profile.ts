import {
  createMap,
  extend,
  Mapper,
  MappingConfiguration,
  MappingProfile,
} from '@automapper/core';
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

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserEntity, UserDto);
      createMap(mapper, UserEntity, UserInformationDto);
      createMap(mapper, UserEntity, AuthUserDto);
    };
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    return [extend(BaseEntity, BaseDto)];
  }
}
