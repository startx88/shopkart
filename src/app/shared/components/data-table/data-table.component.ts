import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() data: any = [];
  @Input() hideColumns: string[] = ['id'];
  @Input() isSetting: boolean = true;
  @Input() heading: string[] = [];
  @Output() handler = new EventEmitter<{ status: string; item: any }>();
  filteredData: any = [];
  keys: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  // track by id
  trackItemById(id: string, item: any) {
    console.log();
    return item.id === id;
  }

  onHandler(status: string, item: any) {
    this.handler.emit({ status, item });
  }

  onActiveHandler(status: string, item: any) {}
  onInactiveHandler(status: string, item: any) {
    this.handler.emit({ status, item });
  }
  onEditHandler(status: string, item: any) {
    this.handler.emit({ status, item });
  }
  onDeleteHandler(status: string, item: any) {
    this.handler.emit({ status, item });
  }
}
