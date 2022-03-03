import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'ct-posts',
  template: `
    Posts
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {}

@NgModule({
  declarations: [PostsComponent],
  exports: [PostsComponent],
})
export class PostsComponentModule {}
