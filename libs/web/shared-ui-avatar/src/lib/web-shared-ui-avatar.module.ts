import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  selector: 'ct-avatar',
  template: `
    <img
      *ngIf="avatar; else noAvatar"
      [src]="avatar"
      alt="Avatar of User"
      class="w-12 h-12 border-circle"
    />
    <ng-template #noAvatar>
      <i class="pi pi-user"></i>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() avatar?: string;

  @HostBinding('class') readonly hostClass =
    'flex align-items-center justify-content-center w-3rem h-3rem border-2 border-300 border-circle';
}

@NgModule({
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
  imports: [CommonModule],
})
export class WebSharedUiAvatarModule {}
