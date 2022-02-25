import { AutoMap } from '@automapper/classes';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OptionalProps,
  Property,
  Reference,
} from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

@Entity({ collection: 'posts' })
export class PostEntity extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Property()
  @AutoMap()
  text!: string;

  @ManyToOne(() => UserEntity)
  @AutoMap({ typeFn: () => UserEntity })
  author!: Reference<UserEntity>;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  @AutoMap({ typeFn: () => CommentEntity })
  comments = new Collection<CommentEntity>(this);

  @ManyToMany(() => UserEntity, (user) => user.liked)
  @AutoMap({ typeFn: () => UserEntity })
  likedBy = new Collection<UserEntity>(this);
}
