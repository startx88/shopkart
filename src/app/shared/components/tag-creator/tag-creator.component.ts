import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-tag-creator',
  templateUrl: './tag-creator.component.html',
  styleUrls: ['./tag-creator.component.scss'],
})
export class TagCreatorComponent implements OnInit {
  @Input() tags: string[] = [];
  @Output() getTags: EventEmitter<string[]> = new EventEmitter<string[]>();
  @ViewChild('input') inp: ElementRef;
  constructor() {}
  ngOnInit(): void {}
  // tag creator
  addTag(event: KeyboardEvent) {
    event.preventDefault();
    const val = (<HTMLInputElement>event.target).value.trim();
    if (val.length > 0 && !this.tags.includes(val)) {
      this.tags.push(val);
      this.inp.nativeElement.value = '';
    } else {
      this.inp.nativeElement.value = '';
    }
  }

  onRemoveTag(index: number) {
    this.tags.splice(index, 1);
  }

  // // remove by backspace
  removeLastTag(event: Event) {
    if ((<HTMLInputElement>event.target).value.length === 0) {
      this.onRemoveTag(this.tags.length - 1);
    }
  }
}
