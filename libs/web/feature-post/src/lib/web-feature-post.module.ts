import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostComponent, PostComponentModule } from './post.component';

@NgModule({
  imports: [
    CommonModule,
    PostComponentModule,
    RouterModule.forChild([{ path: '', component: PostComponent }]),
  ],
})
export class WebFeaturePostModule {}
