import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { PostDto } from '@nx-post/web/shared-data-access-api-sdk';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { PostItemHeaderComponentModule } from './post-item-header.component';

@Component({
  selector: 'ct-post-item[post]',
  template: `
    <ct-post-item-header
      [name]="post.author.name"
      [username]="post.author.username"
      [avatarUrl]="post.author.avatarUrl"
      [updatedAt]="post.updatedAt"
    ></ct-post-item-header>
    <p class="my-2">{{ post.text }}</p>
    <hr class="p-divider my-2" />
    <div class="flex justify-content-end">
      <button
        pButton
        pRipple
        type="button"
        icon="pi pi-heart"
        class="p-button-rounded p-button-danger p-button-sm"
        [class.p-button-outlined]="!isLiked"
        [pTooltip]="isLiked ? 'Unlike' : 'Like'"
        tooltipPosition="top"
        (click)="isLiked ? unlike.emit() : like.emit()"
        [label]="post.likedByCount.toString()"
      ></button>
      <button
        pButton
        pRipple
        type="button"
        icon="pi pi-comment"
        class="p-button-rounded p-button-info p-button-sm ml-2"
        pTooltip="Comments"
        tooltipPosition="top"
        (click)="comment.emit()"
        [label]="post.commentsCount.toString()"
      ></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemComponent {
  @Input() post!: PostDto;
  @Input() isLiked = false;

  @Output() like = new EventEmitter();
  @Output() unlike = new EventEmitter();
  @Output() comment = new EventEmitter();

  @HostBinding('class') readonly hostClass =
    'col-12 shadow-4 p-4 mb-4 p-component block';
}

@NgModule({
  declarations: [PostItemComponent],
  exports: [PostItemComponent],
  imports: [
    PostItemHeaderComponentModule,
    ButtonModule,
    CommonModule,
    RippleModule,
    TooltipModule,
  ],
})
export class PostItemComponentModule {}
