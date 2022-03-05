import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  authInterceptorProvider,
} from '@nx-post/web/shared-data-access-auth';
import { LayoutComponent, LayoutComponentModule } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutComponentModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'posts',
            pathMatch: 'full',
          },
          {
            path: 'posts',
            canLoad: [AuthGuard],
            loadChildren: async () =>
              (await import('@nx-post/web/feature-posts'))
                .WebFeaturePostsModule,
          },
          {
            path: 'login',
            loadChildren: async () =>
              (await import('@nx-post/web/feature-login'))
                .WebFeatureLoginModule,
          },
          {
            path: 'register',
            loadChildren: async () =>
              (await import('@nx-post/web/feature-register'))
                .WebFeatureRegisterModule,
          },
        ],
      },
    ]),
  ],
  providers: [authInterceptorProvider],
  exports: [RouterModule],
})
export class WebFeatureShellModule {}
