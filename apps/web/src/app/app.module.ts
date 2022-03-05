import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebFeatureShellModule } from '@nx-post/web/feature-shell';
import { API_BASE_URL } from '@nx-post/web/shared-data-access-api-sdk';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, WebFeatureShellModule],
  providers: [{ provide: API_BASE_URL, useValue: environment.apiBaseUrl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
