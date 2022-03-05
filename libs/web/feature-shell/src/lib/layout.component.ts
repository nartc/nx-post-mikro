import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutMessageService } from '@nx-post/web/data-access-shell';
import { WebSharedUiAvatarModule } from '@nx-post/web/shared-ui-avatar';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { LayoutStore } from './layout.store';

@Component({
  selector: 'ct-layout',
  template: `
    <p-toast position="bottom-right"></p-toast>
    <ng-container *ngIf="vm$ | async as vm">
      <p-menubar [model]="vm.menuItems">
        <ng-container *ngIf="vm.displayName">
          <ng-template pTemplate="start">
            <a class="no-underline text-inherit" routerLink="/">
              <div
                class="flex align-items-center hover:bg-black-alpha-10 cursor-pointer border-round"
              >
                <ct-avatar [avatar]="vm.avatar"></ct-avatar>
                <span class="mx-2">{{ vm.displayName }}</span>
              </div>
            </a>
          </ng-template>
        </ng-container>
      </p-menubar>
      <div class="p-4">
        <router-outlet></router-outlet>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LayoutMessageService, MessageService, LayoutStore],
})
export class LayoutComponent implements OnInit {
  readonly vm$ = this.layoutStore.vm$;

  constructor(private layoutStore: LayoutStore) {}

  ngOnInit() {
    this.layoutStore.init();
  }
}

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [
    MenubarModule,
    RouterModule,
    ToastModule,
    CommonModule,
    WebSharedUiAvatarModule,
  ],
})
export class LayoutComponentModule {}
