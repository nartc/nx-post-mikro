import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@nx-post/web/shared-data-access-auth';
import { PostsComponent, PostsComponentModule } from './posts.component';

@NgModule({
  imports: [
    CommonModule,
    PostsComponentModule,
    RouterModule.forChild([
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: PostsComponent,
          },
          {
            path: ':id',
            loadChildren: async () =>
              (await import('@nx-post/web/feature-post')).WebFeaturePostModule,
          },
        ],
      },
    ]),
  ],
})
export class WebFeaturePostsModule {}
