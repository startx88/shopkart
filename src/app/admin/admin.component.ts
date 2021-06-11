import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `<div class="wrapper">
    <app-sidebar></app-sidebar>
    <div class="wrapper-container">
      <app-header></app-header>
      <div class="wrapper-content">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  </div>`,
  styles: [],
  host: { class: 'flex' },
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
