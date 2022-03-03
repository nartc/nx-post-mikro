import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterParamsDto } from '@nx-post/web/shared-data-access-api-sdk';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { RegisterStore } from './register.store';

@Component({
  selector: 'ct-register',
  template: `
    <div
      class="align-items-center flex justify-content-center lg:px-8 md:px-6 px-4 py-8"
    >
      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
          <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
          <span class="text-600 font-medium line-height-3">
            Already have an account?
          </span>
          <a
            routerLink="/login"
            class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >
            Login!
          </a>
        </div>

        <form #registerForm="ngForm" (ngSubmit)="onSubmit(registerForm)">
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
                [(ngModel)]="registerDto.username"
                pInputText
                class="w-full"
                required
              />
              <small
                *ngIf="usernameInput.touched && usernameInput.errors"
                id="registerUsernameError"
                class="p-error block"
              >
                Invalid Username
              </small>
            </div>

            <div class="mb-3">
              <label for="email" class="block text-900 font-medium">
                Email
              </label>
              <input
                #emailInput="ngModel"
                id="email"
                name="formEmail"
                type="text"
                [(ngModel)]="registerDto.email"
                pInputText
                class="w-full"
                required
                email
              />
              <small
                *ngIf="emailInput.touched && emailInput.errors"
                id="registerEmailError"
                class="p-error block"
              >
                Invalid email
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
                [(ngModel)]="registerDto.password"
                pInputText
                class="w-full"
                required
              />
              <small
                *ngIf="passwordInput.touched && passwordInput.errors"
                id="registerPasswordError"
                class="p-error block"
              >
                Invalid password
              </small>
            </div>

            <div class="mb-3">
              <label for="name" class="block text-900 font-medium">Name</label>
              <input
                id="name"
                name="formName"
                type="text"
                [(ngModel)]="registerDto.name"
                pInputText
                class="w-full"
              />
            </div>

            <div class="mb-3">
              <label for="avatarUrl" class="block text-900 font-medium">
                AvatarURL
              </label>
              <input
                id="avatarUrl"
                name="formAvatarUrl"
                type="text"
                [(ngModel)]="registerDto.avatarUrl"
                pInputText
                class="w-full"
              />
            </div>

            <div class="mb-3">
              <label for="location" class="block text-900 font-medium">
                Location
              </label>
              <input
                id="location"
                name="formLocation"
                type="text"
                [(ngModel)]="registerDto.location"
                pInputText
                class="w-full"
              />
            </div>

            <button
              pButton
              pRipple
              type="submit"
              label="Register"
              icon="pi pi-user"
              class="w-full"
              [disabled]="registerForm.invalid"
            ></button>
          </div>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterStore],
})
export class RegisterComponent {
  registerDto: RegisterParamsDto = {
    username: '',
    password: '',
    email: '',
    avatarUrl: '',
    name: '',
    location: '',
  };

  constructor(private registerStore: RegisterStore) {}

  onSubmit(registerForm: NgForm) {
    this.registerStore.register(this.registerDto);
    this.registerDto = {
      username: '',
      password: '',
      email: '',
      avatarUrl: '',
      name: '',
      location: '',
    };
    registerForm.reset(this.registerDto);
  }
}

@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RouterModule,
  ],
})
export class RegisterComponentModule {}
