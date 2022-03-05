import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule,
} from '@angular/core';
import { CommentDto } from '@nx-post/web/shared-data-access-api-sdk';
import { PostItemHeaderComponentModule } from '@nx-post/web/ui-post-item';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'ct-post-comments',
  template: `
    <p-card *ngFor="let comment of comments" styleClass="mb-2">
      <ct-post-item-header
        [updatedAt]="comment.updatedAt"
        [name]="comment.author.name"
        [username]="comment.author.username"
        [avatarUrl]="comment.author.avatarUrl"
      ></ct-post-item-header>
      <p>{{ comment.text }}</p>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent {
  @Input() comments: CommentDto[] = [];

  @HostBinding('class') readonly hostClass = 'mb-4 block';
}

@NgModule({
  declarations: [PostCommentsComponent],
  exports: [PostCommentsComponent],
  imports: [CommonModule, CardModule, PostItemHeaderComponentModule],
})
export class WebUiPostCommentsModule {}
