import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginParamsDto } from '@nx-post/web/shared-data-access-api-sdk';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { LoginStore } from './login.store';

@Component({
  selector: 'ct-login',
  template: `
    <div
      class="align-items-center flex justify-content-center lg:px-8 md:px-6 px-4 py-8"
    >
      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
          <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span class="text-600 font-medium line-height-3">
            Don't have an account?
          </span>
          <a
            routerLink="/register"
            class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >
            Create today!
          </a>
        </div>

        <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
          <div class="flex flex-column">
            <div class="mb-3">
              <label for="username" class="block text-900 font-medium">
                Username
              </label>
              <input
                #usernameInput="ngModel"
                id="username"
                name="formUsername"
                type="text"
                [(ngModel)]="loginDto.username"
                pInputText
                class="w-full"
                required
              />
              <small
                *ngIf="usernameInput.touched && usernameInput.errors"
                id="loginUsernameError"
                class="p-error block"
              >
                Invalid username
              </small>
            </div>

            <div class="mb-3">
              <label for="password" class="block text-900 font-medium">
                Password
              </label>
              <input
                #passwordInput="ngModel"
                id="password"
                name="formPassword"
                type="password"
                [(ngModel)]="loginDto.password"
                pInputText
                class="w-full"
                required
              />
              <small
                *ngIf="passwordInput.touched && passwordInput.errors"
                id="loginPasswordError"
                class="p-error block"
              >
                Invalid password
              </small>
            </div>

            <button
              pButton
              pRipple
              type="submit"
              label="Log In"
              icon="pi pi-user"
              class="w-full"
              [disabled]="loginForm.invalid"
            ></button>
          </div>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginStore],
})
export class LoginComponent {
  loginDto: LoginParamsDto = {
    username: '',
    password: '',
  };

  constructor(private loginStore: LoginStore) {}

  onSubmit(loginForm: NgForm) {
    this.loginStore.login(this.loginDto);
    this.loginDto = { username: '', password: '' };
    loginForm.reset(this.loginDto);
  }
}

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    CommonModule,
  ],
})
export class LoginComponentModule {}
