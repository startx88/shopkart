import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTagCreator]',
})
export class TagCreatorDirective implements OnInit {
  @Input('appTagCreator') tags: string[] = [];
  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {}

  @HostListener('keyup.enter', ['$event']) onkeyUpEnter(event: KeyboardEvent) {
    event.preventDefault();
  }
  @HostListener('keyup', ['$event']) onkeyUpTab(event: KeyboardEvent) {
    console.log(event);
    event.preventDefault();
  }

  _handler() {
    const value = (this._el.nativeElement as HTMLInputElement).value;
    if (value.length > 0 && !this.tags.includes(value)) {
      this.tags.push(value);
      this._el.nativeElement.value = '';
    } else {
      this._el.nativeElement.value = '';
    }
  }
}
