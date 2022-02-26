import { AutoMap } from '@automapper/classes';
import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  OptionalProps,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity({ collection: 'comments' })
export class CommentEntity extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Property()
  @AutoMap()
  text!: string;

  @ManyToOne(() => UserEntity, { wrappedReference: true })
  @AutoMap({ typeFn: () => UserEntity })
  author!: IdentifiedReference<UserEntity, '_id' | 'id'>;

  @ManyToOne(() => PostEntity, { wrappedReference: true })
  @AutoMap({ typeFn: () => PostEntity })
  post!: IdentifiedReference<PostEntity, '_id' | 'id'>;
}
