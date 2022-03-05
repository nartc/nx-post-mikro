import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import {
  CommentControllerService,
  CreateCommentParamsDto,
  PostControllerService,
  PostDto,
} from '@nx-post/web/shared-data-access-api-sdk';
import {
  concatMap,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';

export interface PostState {
  post?: PostDto;
}

@Injectable()
export class PostStore extends ComponentStore<PostState> {
  readonly post$ = this.select((s) => s.post, { debounce: true });

  constructor(
    private postControllerService: PostControllerService,
    private commentControllerService: CommentControllerService,
    private route: ActivatedRoute
  ) {
    super({});
  }

  private readonly getPost = this.effect<string>(
    switchMap((postId) =>
      this.postControllerService.getPost(postId).pipe(
        tap({
          next: (post) => {
            this.setState({ post });
          },
          error: (err) => {
            console.log({ err });
          },
        })
      )
    )
  );

  readonly like = this.effect<string>(
    concatMap((postId) =>
      this.postControllerService.like(postId).pipe(
        tap({
          next: (post) => {
            this.patchState({ post });
          },
        })
      )
    )
  );

  readonly unlike = this.effect<string>(
    concatMap((postId) =>
      this.postControllerService.unlike(postId).pipe(
        tap({
          next: (post) => {
            this.patchState({ post });
          },
        })
      )
    )
  );

  readonly comment = this.effect<CreateCommentParamsDto>(
    concatMap((dto) =>
      this.commentControllerService.create(dto).pipe(
        tap({
          next: (comment) => {
            this.patchState((state) => ({
              post: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ...state.post!,
                comments: [...(state.post?.comments || []), comment],
                commentsCount: (state.post?.commentsCount || 0) + 1,
              },
            }));
          },
        })
      )
    )
  );

  init() {
    this.getPost(
      this.route.params.pipe(
        map((params) => params['id']),
        filter((id) => id),
        distinctUntilChanged()
      )
    );
  }
}
