import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  color: Color = Color.white;
  constructor() {}

  ngOnInit(): void {}
}
