import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { LayoutMessageService } from './layout-message.service';

@Component({
  selector: 'ct-layout',
  template: `
    <p-toast position="bottom-right"></p-toast>
    <p-menubar [model]="menuItems"></p-menubar>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LayoutMessageService, MessageService],
})
export class LayoutComponent implements OnInit {
  menuItems: MenuItem[] = [
    { label: 'Login', routerLink: '/login' },
    { label: 'Register', routerLink: '/register' },
  ];

  ngOnInit() {
    this.authStore.init();
  }

  constructor(private authStore: AuthStore) {}
}

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [MenubarModule, RouterModule, ToastModule],
})
export class LayoutComponentModule {}
