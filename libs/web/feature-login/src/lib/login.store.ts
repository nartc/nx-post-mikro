import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { LayoutMessageService } from '@nx-post/web/feature-shell';
import {
  ApiExceptionDto,
  LoginParamsDto,
  SecurityControllerService,
} from '@nx-post/web/shared-data-access-api-sdk';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';
import { concatMap, tap } from 'rxjs';

@Injectable()
export class LoginStore extends ComponentStore<Record<string, never>> {
  constructor(
    private securityControllerService: SecurityControllerService,
    private authStore: AuthStore,
    private layoutMessageService: LayoutMessageService,
    private router: Router
  ) {
    super({});
  }

  readonly login = this.effect<LoginParamsDto>(
    concatMap((dto) =>
      this.securityControllerService.login(dto).pipe(
        tap({
          next: (tokenResult) => {
            this.authStore.setState(tokenResult);
            void this.router.navigate(['/']);
          },
          error: (err: ApiExceptionDto) => {
            this.layoutMessageService.addErrorMessage({
              summary: 'Login Error',
              detail: err.message,
            });
          },
        })
      )
    )
  );
}
