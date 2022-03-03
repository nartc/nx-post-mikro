import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private authStore: AuthStore, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.isAuth$();
  }

  canLoad(): Observable<boolean> {
    return this.isAuth$();
  }

  canActivateChild(): Observable<boolean> {
    return this.isAuth$();
  }

  private isAuth$(): Observable<boolean> {
    return this.authStore.isAuthenticated$.pipe(
      take(1),
      tap((isAuth) => {
        if (!isAuth) {
          void this.router.navigate(['/sign-in']);
        }
      })
    );
  }
}
