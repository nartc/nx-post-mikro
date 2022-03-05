import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { WebUiPostInputModule } from '@nx-post/web/ui-post-input';
import { PostItemComponentModule } from '@nx-post/web/ui-post-item';
import { DataViewModule } from 'primeng/dataview';
import { PostsStore } from './posts.store';

@Component({
  selector: 'ct-posts',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="grid">
        <div class="col-8 col-offset-2">
          <ct-post-input (inputSubmit)="onPostSubmit($event)"></ct-post-input>
          <p-dataView [value]="vm.posts" layout="list">
            <ng-template pTemplate="listItem" let-post>
              <ct-post-item
                [post]="post"
                [isLiked]="vm.likedByMe[post.id]"
                (like)="onLike(post.id)"
                (unlike)="onUnlike(post.id)"
                (comment)="onComment(post.id)"
              ></ct-post-item>
            </ng-template>
          </p-dataView>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostsStore],
})
export class PostsComponent implements OnInit {
  readonly vm$ = this.postsStore.vm$;

  constructor(private postsStore: PostsStore) {}

  ngOnInit() {
    this.postsStore.getAll();
  }

  onLike(id: string) {
    this.postsStore.like(id);
  }

  onUnlike(id: string) {
    this.postsStore.unlike(id);
  }

  onComment(id: string) {
    this.postsStore.goToPost(id);
  }

  onPostSubmit(text: string) {
    this.postsStore.create(text);
  }
}

@NgModule({
  declarations: [PostsComponent],
  exports: [PostsComponent],
  imports: [
    CommonModule,
    DataViewModule,
    PostItemComponentModule,
    WebUiPostInputModule,
  ],
})
export class PostsComponentModule {}
