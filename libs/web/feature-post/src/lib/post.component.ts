import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'ct-post',
  template: `
    Post
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {}

@NgModule({
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostComponentModule {}
