import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import {
  PostControllerService,
  PostDto,
} from '@nx-post/web/shared-data-access-api-sdk';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';
import { concatMap, Observable, pipe, switchMapTo, tap } from 'rxjs';

export interface PostsState {
  posts: PostDto[];
}

@Injectable()
export class PostsStore extends ComponentStore<PostsState> {
  readonly posts$ = this.select((s) => s.posts);
  readonly likedByMe$ = this.select(
    this.posts$,
    this.authStore.user$,
    (posts, user) =>
      posts.reduce((record, { likedBy, id }) => {
        record[id] =
          !!user && likedBy.some((likedPost) => likedPost.id === user.id);
        return record;
      }, {} as Record<string, boolean>)
  );

  readonly vm$: Observable<{
    posts: PostDto[];
    likedByMe: Record<string, boolean>;
  }> = this.select(
    this.posts$,
    this.likedByMe$,
    (posts, likedByMe) => ({ posts, likedByMe }),
    { debounce: true }
  );

  constructor(
    private postControllerService: PostControllerService,
    private authStore: AuthStore,
    private router: Router,
    private http: HttpClient
  ) {
    super({ posts: [] });
  }

  readonly getAll = this.effect<void>(
    switchMapTo(
      this.postControllerService.get().pipe(
        tap({
          next: (posts) => {
            this.patchState({ posts });
          },
          error: (err) => {
            console.log({ err });
          },
        })
      )
    )
  );

  readonly create = this.effect<string>(
    concatMap((text) =>
      this.postControllerService.create({ text }).pipe(
        tap((newPost) => {
          this.patchState((state) => ({ posts: [newPost, ...state.posts] }));
        })
      )
    )
  );

  readonly like = this.effect<string>(
    concatMap((postId) =>
      this.postControllerService.like(postId).pipe(this.updatePostInplace())
    )
  );

  readonly unlike = this.effect<string>(
    concatMap((postId) =>
      this.postControllerService.unlike(postId).pipe(this.updatePostInplace())
    )
  );

  readonly goToPost = this.effect<string>(
    tap((postId) => {
      void this.router.navigate(['/posts', postId]);
    })
  );

  private readonly updatePostInplace = () => {
    return pipe(
      tap((updated: PostDto) => {
        this.patchState((state) => ({
          posts: state.posts.map((post) => {
            if (updated.id === post.id) return updated;
            return post;
          }),
        }));
      })
    );
  };
}
