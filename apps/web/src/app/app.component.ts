import { Component, OnInit } from '@angular/core';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';

@Component({
  selector: 'ct-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(private authStore: AuthStore) {}

  ngOnInit() {
    this.authStore.init();
  }
}
