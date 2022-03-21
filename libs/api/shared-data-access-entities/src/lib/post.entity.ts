import { AutoMap } from '@automapper/classes';
import {
  Cascade,
  Collection,
  Entity,
  IdentifiedReference,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OptionalProps,
  Property,
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

  @ManyToOne(() => UserEntity, { wrappedReference: true })
  @AutoMap(() => UserEntity)
  author!: IdentifiedReference<UserEntity, '_id' | 'id'>;

  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    cascade: [Cascade.ALL],
  })
  @AutoMap(() => [CommentEntity])
  comments = new Collection<CommentEntity>(this);

  @ManyToMany(() => UserEntity, (user) => user.liked)
  @AutoMap(() => [UserEntity])
  likedBy = new Collection<UserEntity>(this);
}
