import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from '@nx-post/api/data-access-comment';
import {
  AuthUserDto,
  CommentDto,
  CreateCommentParamsDto,
} from '@nx-post/api/shared-data-access-dtos';
import { ApiErrors, CurrentUser } from '@nx-post/api/shared-utils-decorators';

@ApiTags('Comment')
@ApiErrors()
@ApiBearerAuth()
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('post/:postId')
  @ApiOkResponse({ type: CommentDto, isArray: true })
  async get(@Param('postId') postId: string): Promise<CommentDto[]> {
    return await this.commentService.getComments(postId);
  }

  @Get(':id')
  @ApiOkResponse({ type: CommentDto })
  async getById(@Param('id') id: string): Promise<CommentDto> {
    return await this.commentService.getComment(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({ type: CommentDto })
  async create(
    @CurrentUser() currentUser: AuthUserDto,
    @Body() dto: CreateCommentParamsDto
  ): Promise<CommentDto> {
    return await this.commentService.createComment(currentUser.id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOkResponse()
  async delete(
    @CurrentUser() currentUser: AuthUserDto,
    @Param('id') id: string
  ): Promise<void> {
    return await this.commentService.deleteComment(currentUser.id, id);
  }
}
