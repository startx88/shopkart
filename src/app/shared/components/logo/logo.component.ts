import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() url: string = '/';
  @Input() size: number = 45;
  @Input() color: string;
  @Input() name: string = 'logo';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
