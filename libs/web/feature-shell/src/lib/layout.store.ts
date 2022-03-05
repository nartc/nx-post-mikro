import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';
import { MenuItem } from 'primeng/api';
import { Observable, tap } from 'rxjs';

const initialMenuItems = [
  { label: 'Login', routerLink: '/login' },
  { label: 'Register', routerLink: '/register' },
];

@Injectable()
export class LayoutStore extends ComponentStore<{ menuItems: MenuItem[] }> {
  readonly menuItems$ = this.select((s) => s.menuItems);

  readonly vm$: Observable<{
    menuItems: MenuItem[];
    displayName: string;
    avatar?: string;
  }> = this.select(
    this.menuItems$,
    this.authStore.user$,
    (menuItems, user) => ({
      menuItems,
      avatar: user?.avatarUrl,
      displayName: user?.name || user?.username || '',
    }),
    { debounce: true }
  );

  constructor(private authStore: AuthStore) {
    super({
      menuItems: initialMenuItems,
    });
  }

  private readonly updateMenuItems = this.effect<boolean>(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        this.patchState({
          menuItems: [
            { label: 'Posts', routerLink: '/posts' },
            {
              label: 'Logout',
              command: () => {
                this.authStore.logout();
              },
            },
          ],
        });
      } else {
        this.patchState({ menuItems: initialMenuItems });
      }
    })
  );

  init() {
    this.updateMenuItems(this.authStore.isAuthenticated$);
  }
}
