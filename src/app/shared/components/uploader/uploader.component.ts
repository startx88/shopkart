import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  @Input() name: string = 'image';
  @Input() multiple: boolean = false;
  @Input() selectImage: string;
  @Input() preview: boolean = true;
  @Output() upload = new EventEmitter<Blob>();
  image: string | ArrayBuffer;
  constructor() {}

  ngOnInit(): void {}

  // upload method
  onUpload(event: any): void {
    const files = event.target.files;
    const reader = new FileReader();
    if (this.multiple) {
      this.upload.emit(files);
      for (let index = 0; index < files.length; index++) {
        reader.onload = () => {};
        reader.readAsDataURL(files[index]);
      }
    } else {
      this.upload.emit(files[0]);
      reader.onload = () => {
        this.image = reader.result;

        Object.defineProperty(files[0], 'url', {
          value: reader.result,
          writable: false,
          enumerable: true,
          configurable: true,
        });
      };
      reader.readAsDataURL(files[0]);
    }
  }
}
