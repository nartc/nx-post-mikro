import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  RegisterComponent,
  RegisterComponentModule,
} from './register.component';

@NgModule({
  imports: [
    CommonModule,
    RegisterComponentModule,
    RouterModule.forChild([{ path: '', component: RegisterComponent }]),
  ],
})
export class WebFeatureRegisterModule {}
