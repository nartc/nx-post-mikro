import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { WebUiPostCommentsModule } from '@nx-post/web/ui-post-comments';
import { WebUiPostInputModule } from '@nx-post/web/ui-post-input';
import { PostItemComponentModule } from '@nx-post/web/ui-post-item';
import { PostStore } from './post.store';

@Component({
  selector: 'ct-post',
  template: `
    <div class="grid">
      <div class="col-8 col-offset-2">
        <ng-container *ngIf="post$ | async as post">
          <ct-post-item
            [post]="post"
            (like)="onLike(post.id)"
            (unlike)="onUnlike(post.id)"
          ></ct-post-item>
          <ct-post-comments [comments]="post.comments"></ct-post-comments>
          <ct-post-input
            (inputSubmit)="onSubmit($event, post.id)"
          ></ct-post-input>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostStore],
})
export class PostComponent implements OnInit {
  readonly post$ = this.postStore.post$;

  constructor(private postStore: PostStore) {}

  ngOnInit(): void {
    this.postStore.init();
  }

  onSubmit(text: string, id: string) {
    this.postStore.comment({ text, postId: id });
  }

  onLike(id: string) {
    this.postStore.like(id);
  }

  onUnlike(id: string) {
    this.postStore.unlike(id);
  }
}

@NgModule({
  declarations: [PostComponent],
  exports: [PostComponent],
  imports: [
    CommonModule,
    PostItemComponentModule,
    WebUiPostCommentsModule,
    WebUiPostInputModule,
  ],
})
export class PostComponentModule {}
