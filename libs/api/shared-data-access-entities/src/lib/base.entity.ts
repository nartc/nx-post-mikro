import { AutoMap } from '@automapper/classes';
import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ abstract: true })
export class BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  @AutoMap()
  id!: string;

  @Property()
  @AutoMap(() => Date)
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  @AutoMap(() => Date)
  updatedAt = new Date();
}
