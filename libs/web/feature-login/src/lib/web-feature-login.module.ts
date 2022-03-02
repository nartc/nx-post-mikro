import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent, LoginComponentModule } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginComponentModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
})
export class WebFeatureLoginModule {}
