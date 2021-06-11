import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IColor } from 'src/app/models/color.modal';
import { ColorService } from 'src/app/services/color.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CrudStatus } from 'src/app/utility/enums/crud-status.enum';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent implements OnInit {
  colors$: Observable<IColor[]>;
  form: FormGroup;
  editData: IColor;
  isEditable: boolean = false;
  selectedImage: string;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalBtn') button: ButtonComponent;
  constructor(private fb: FormBuilder, private colorService: ColorService) {}

  ngOnInit(): void {
    this.colors$ = this.colorService.loadData();

    this.form = this.fb.group({
      title: ['', Validators.required],
      color: ['', Validators.required],
      image: [File],
    });
  }

  // select file
  onUpload(file: File) {
    this.form.patchValue({
      image: file,
    });
  }

  // reset form on modal close
  onModalClose() {
    this.form.reset();
    this.isEditable = false;
    this.editData = null;
    this.selectedImage = '';
  }

  // add / update data
  onAddUpdate() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    if (this.isEditable) {
      this.colorService
        .addUpdateItem(this.form.value, this.editData.id)
        .subscribe(
          (response: IColor) => {
            this.form.reset();
            this.modal.hide();
            this.isEditable = false;
            this.editData = null;
          },
          (error) => console.log(error)
        );
    } else {
      this.colorService.addUpdateItem(this.form.value).subscribe(
        (response: IColor) => {
          this.form.reset();
          this.modal.hide();
        },
        (error) => console.log(error)
      );
    }
  }

  // handler
  onHandler(data: { status: string; item: IColor }) {
    switch (data.status) {
      case CrudStatus.EDIT:
        this.onEditHandler(data.item);
        break;
      case CrudStatus.ACTIVE:
        this.onActiveHandler(data.item);
        break;
      case CrudStatus.INACTIVE:
        this.onDeactiveHandler(data.item);
        break;
      default:
        this.onDeleteHandler(data.item);
        break;
    }
  }
  // edit brand
  onActiveHandler(data: IColor) {
    return this.colorService.activeInactiveItem(data.id, 'active').subscribe(
      (response: IColor) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onDeactiveHandler(data: IColor) {
    return this.colorService.activeInactiveItem(data.id, 'inactive').subscribe(
      (response: IColor) => {},
      (error) => console.log(error)
    );
  }
  // delete brand
  onDeleteHandler(data: IColor) {
    return this.colorService.deleteItem(data.id).subscribe(
      (response: IColor) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onEditHandler(data: IColor) {
    this.button.btn.nativeElement.click();
    this.isEditable = !!data;
    this.editData = data;
    this.selectedImage = data.image;
    this.form.patchValue({
      title: data.title,
    });
  }
  // validations
  get title() {
    return this.form.get('title');
  }
  get color() {
    return this.form.get('color');
  }
}
