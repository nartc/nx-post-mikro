import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { WebSharedUiAvatarModule } from '@nx-post/web/shared-ui-avatar';

@Component({
  selector: 'ct-post-item-header',
  template: `
    <div class="flex">
      <ct-avatar [avatar]="avatarUrl"></ct-avatar>
      <div class="flex flex-column ml-2">
        <h4 class="mb-0">{{ username }}</h4>
        <h5 class="font-light my-0">({{ name || username }})</h5>
      </div>
      <small class="ml-auto">{{ updatedAt | date: 'short' }}</small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemHeaderComponent {
  @Input() avatarUrl = '';
  @Input() username = '';
  @Input() name = '';
  @Input() updatedAt = new Date();
}

@NgModule({
  declarations: [PostItemHeaderComponent],
  exports: [PostItemHeaderComponent],
  imports: [CommonModule, WebSharedUiAvatarModule],
})
export class PostItemHeaderComponentModule {}
