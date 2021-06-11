import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlert } from 'src/app/models/alert.model';
import { AlertService } from 'src/app/services/alert.service';
import { Direction } from 'src/app/utility/enums/direction.enu';
import { Size } from 'src/app/utility/enums/size.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alert$: Observable<IAlert>;
  @Input() size: Size;
  @Input() direction: Direction;
  constructor(private alertService: AlertService) {}
  ngOnInit(): void {
    this.alert$ = this.alertService.alert;
  }
  onClose() {
    this.alertService.alertHide();
  }
}
