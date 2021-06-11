import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Size } from 'src/app/utility/enums/size.enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  title: string;
  @Input() isEdit: boolean = false;
  @Input() id: string;
  @Input() size: Size = Size.sm;
  @Output() close = new EventEmitter<void>();
  @ViewChild('close') closeModal: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const title = this.router.url.split('/').filter((x) => x != '');
    this.title = title[title.length - 1];
  }

  // on close
  onClose() {
    this.close.emit();
  }

  // hide
  hide() {
    this.closeModal.nativeElement.click();
  }
}
