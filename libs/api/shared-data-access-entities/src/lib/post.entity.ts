import { AutoMap } from '@automapper/classes';
import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({ collection: 'posts' })
export class PostEntity extends BaseEntity {
  @Property()
  @AutoMap()
  text!: string;
}
