import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { UserInformationDto } from '@nx-post/web/shared-data-access-api-sdk';
import { filter, tap } from 'rxjs';

export interface AuthState {
  token?: string;
  user?: UserInformationDto;
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthState> {
  readonly token$ = this.select((s) => s.token).pipe(
    filter((token) => token !== undefined)
  );
  readonly user$ = this.select((s) => s.user);
  readonly isAuthenticated$ = this.select(this.token$, (token) => !!token);

  constructor(private router: Router) {
    super({});
  }

  private readonly storeLocal = this.effect<AuthState>(
    tap(({ user, token }) => {
      if (!token) {
        localStorage.removeItem('@@nx_post_token');
        localStorage.removeItem('@@nx_post_user');
      } else {
        localStorage.setItem('@@nx_post_token', token);
        localStorage.setItem('@@nx_post_user', JSON.stringify(user));
      }
    })
  );

  readonly logout = this.effect<void>(
    tap(() => {
      this.setState({ token: '' });
      void this.router.navigate(['/login']);
    })
  );

  init() {
    const token = localStorage.getItem('@@nx_post_token') || '';
    if (token) {
      const stringifiedUser = localStorage.getItem('@@nx_post_user');
      this.setState({
        token,
        user: stringifiedUser ? JSON.parse(stringifiedUser) : undefined,
      });
    } else {
      this.setState({ token: '' });
    }

    this.storeLocal(this.state$);
  }
}
