import { AutoMap } from '@automapper/classes';
import {
  Entity,
  ManyToOne,
  OptionalProps,
  Property,
  Reference,
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

  @ManyToOne(() => UserEntity)
  @AutoMap({ typeFn: () => UserEntity })
  author!: Reference<UserEntity>;

  @ManyToOne(() => PostEntity)
  @AutoMap({ typeFn: () => PostEntity })
  post!: Reference<PostEntity>;
}
