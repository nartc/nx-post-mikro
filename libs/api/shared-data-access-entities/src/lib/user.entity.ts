import { AutoMap } from '@automapper/classes';
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  OptionalProps,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { CommentEntity } from './comment.entity';
import { PostEntity } from './post.entity';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Entity({ collection: 'users' })
export class UserEntity extends BaseEntity {
  [OptionalProps]?: 'role' | 'createdAt' | 'updatedAt';

  @Property()
  @Unique()
  @AutoMap()
  username!: string;

  @Property()
  @Unique()
  @AutoMap()
  email!: string;

  @Property()
  password!: string;

  @Property()
  @Enum({ items: () => UserRole, default: UserRole.User })
  @AutoMap(() => String)
  role = UserRole.User;

  @Property({ nullable: true })
  @AutoMap()
  name?: string;

  @Property({ nullable: true })
  @AutoMap()
  avatarUrl?: string;

  @Property({ nullable: true })
  @AutoMap()
  bio?: string;

  @Property({ nullable: true })
  @AutoMap()
  location?: string;

  @OneToMany(() => PostEntity, (post) => post.author)
  @AutoMap(() => [PostEntity])
  posts = new Collection<PostEntity>(this);

  @ManyToMany(() => PostEntity)
  @AutoMap(() => [PostEntity])
  liked = new Collection<PostEntity>(this);

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  @AutoMap(() => [CommentEntity])
  comments = new Collection<CommentEntity>(this);
}
