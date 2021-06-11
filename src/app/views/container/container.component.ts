import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  page: IPage;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.page = data['detail'];
    });
  }
}
