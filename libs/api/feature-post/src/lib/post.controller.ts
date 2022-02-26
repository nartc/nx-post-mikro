import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from '@nx-post/api/data-access-post';
import {
  AuthUserDto,
  CreatePostParamsDto,
  PostDto,
} from '@nx-post/api/shared-data-access-dtos';
import { ApiErrors, CurrentUser } from '@nx-post/api/shared-utils-decorators';

@ApiTags('Post')
@ApiErrors()
@ApiBearerAuth()
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @ApiOkResponse({ type: PostDto, isArray: true })
  async get(): Promise<PostDto[]> {
    return this.postService.findPosts();
  }

  @Get('my')
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: PostDto, isArray: true })
  async getPostByUser(
    @CurrentUser() currentUser: AuthUserDto
  ): Promise<PostDto[]> {
    return this.postService.findPostByUser(currentUser.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: PostDto })
  async getPost(@Param('id') id: string): Promise<PostDto> {
    return this.postService.findPostDetail(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({ type: PostDto })
  async create(
    @CurrentUser() currentUser: AuthUserDto,
    @Body() dto: CreatePostParamsDto
  ): Promise<PostDto> {
    return this.postService.createPost(currentUser.id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOkResponse()
  async delete(
    @CurrentUser() currentUser: AuthUserDto,
    @Param('id') id: string
  ): Promise<void> {
    return this.postService.deletePost(currentUser.id, id);
  }

  @Put('like/:id')
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: PostDto })
  async like(@CurrentUser() currentUser: AuthUserDto, @Param('id') id: string) {
    return this.postService.like(currentUser.id, id);
  }

  @Put('unlike/:id')
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: PostDto })
  async unlike(
    @CurrentUser() currentUser: AuthUserDto,
    @Param('id') id: string
  ) {
    return this.postService.unlike(currentUser.id, id);
  }
}
