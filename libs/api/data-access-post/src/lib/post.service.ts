import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { QueryOrder, Reference } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '@nx-post/api/data-access-user';
import {
  CreatePostParamsDto,
  PostDto,
} from '@nx-post/api/shared-data-access-dtos';
import {
  PostEntity,
  UserEntity,
} from '@nx-post/api/shared-data-access-entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: EntityRepository<PostEntity>,
    @InjectMapper() private mapper: Mapper,
    private userService: UserService
  ) {}

  async findPosts(): Promise<PostDto[]> {
    const posts = await this.postRepository.findAll({
      orderBy: { createdAt: QueryOrder.DESC },
      limit: 25,
      populate: ['author', 'comments', 'likedBy'],
    });

    return this.mapper.mapArray(posts, PostDto, PostEntity);
  }

  async findPostByUser(userId: string): Promise<PostDto[]> {
    const postsByUser = await this.postRepository.find(
      { author: userId },
      {
        orderBy: { createdAt: QueryOrder.DESC },
        limit: 25,
        populate: ['author', 'comments', 'likedBy'],
      }
    );
    return this.mapper.mapArray(postsByUser, PostDto, PostEntity);
  }

  async findPostDetail(id: string): Promise<PostDto> {
    const post = await this.postRepository.findOneOrFail(
      { id },
      { populate: ['author', 'comments', 'likedBy'] }
    );

    return this.mapper.map(post, PostDto, PostEntity);
  }

  async createPost(userId: string, dto: CreatePostParamsDto): Promise<PostDto> {
    const newPost = this.postRepository.create({
      text: dto.text,
      author: Reference.createFromPK(UserEntity, userId),
    });
    await this.postRepository.persistAndFlush(newPost);
    return this.mapper.map(newPost, PostDto, PostEntity);
  }

  async deletePost(userId: string, postId: string): Promise<void> {
    const post = await this.postRepository.findOneOrFail(
      { id: postId },
      { populate: ['comments'] }
    );

    if (post == null) {
      throw new NotFoundException(postId, 'failed - no post');
    }

    if (post.author.id !== userId) {
      throw new ForbiddenException(
        { userId, postId },
        'failed - no permission to delete post'
      );
    }

    await this.postRepository.removeAndFlush(post);
  }

  async like(userId: string, postId: string): Promise<PostDto> {
    const user = await this.userService.findById(userId);

    if (user == null) {
      throw new NotFoundException(userId, 'failed - no user');
    }

    const post = await this.postRepository.findOneOrFail(
      { id: postId },
      { populate: ['author', 'comments', 'likedBy'] }
    );

    if (post == null) {
      throw new NotFoundException(postId, 'failed - no post');
    }

    post.likedBy.add(user);
    await this.postRepository.flush();
    return this.mapper.map(post, PostDto, PostEntity);
  }

  async unlike(userId: string, postId: string): Promise<PostDto> {
    const user = await this.userService.findById(userId);

    if (user == null) {
      throw new NotFoundException(userId, 'failed - no user');
    }

    const post = await this.postRepository.findOneOrFail(
      { id: postId },
      { populate: ['author', 'comments', 'likedBy'] }
    );

    if (post == null) {
      throw new NotFoundException(postId, 'failed - no post');
    }

    post.likedBy.remove(user);
    await this.postRepository.flush();
    return this.mapper.map(post, PostDto, PostEntity);
  }
}
