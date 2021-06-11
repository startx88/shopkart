import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  title: string;
  @Input() status: string;
  current: string;
  links: string[];
  lastpath: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const urls = this.router.url.split('/').filter((path) => path != '');
    this.links = urls;
    this.current = urls[0];
    this.lastpath = urls[urls.length - 1];
    this.title = urls[urls.length - 1];
  }
}
