import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected: string[] = ['partner', 'admin', 'auth'];
  loading: boolean = false;
  visible: boolean = false;
  constructor(public alertService: AlertService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd) {
        this.loading = false;
      }

      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        const e = event.url.split('/').filter((x) => x)[0];
        if (
          this.protected.includes(e) ||
          (e && e.toString().includes('auth?returnUrl='))
        ) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
    });
  }
}
