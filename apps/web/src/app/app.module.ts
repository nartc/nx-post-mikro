import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebFeatureShellModule } from '@nx-post/web/feature-shell';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, WebFeatureShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
