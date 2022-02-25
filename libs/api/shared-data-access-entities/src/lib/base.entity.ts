import { AutoMap } from '@automapper/classes';
import {
  OptionalProps,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

export abstract class BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  _id!: ObjectId;
  @SerializedPrimaryKey()
  @AutoMap()
  id!: string;

  @Property()
  @AutoMap({ typeFn: () => Date })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  @AutoMap({ typeFn: () => Date })
  updatedAt = new Date();
}
