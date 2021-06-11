import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/models/store.modal';
import { StoreService } from 'src/app/services/store.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CrudStatus } from 'src/app/utility/enums/crud-status.enum';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  stores$: Observable<IStore[]>;
  form: FormGroup;
  editData: IStore;
  isEditable: boolean = false;
  selectedImage: string;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalBtn') button: ButtonComponent;
  constructor(private fb: FormBuilder, private storeService: StoreService) {}

  ngOnInit(): void {
    this.stores$ = this.storeService.loadData();

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
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
  onAddUpdateCategory() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    if (this.isEditable) {
      this.storeService
        .addUpdateItem(this.form.value, this.editData.id)
        .subscribe(
          (response: IStore) => {
            this.form.reset();
            this.modal.hide();
            this.isEditable = false;
            this.editData = null;
          },
          (error) => console.log(error)
        );
    } else {
      this.storeService.addUpdateItem(this.form.value).subscribe(
        (response: IStore) => {
          this.form.reset();
          this.modal.hide();
        },
        (error) => console.log(error)
      );
    }
  }

  // handler
  onHandler(data: { status: string; item: IStore }) {
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
  onActiveHandler(data: IStore) {
    return this.storeService.activeInactiveItem(data.id, 'active').subscribe(
      (response: IStore) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onDeactiveHandler(data: IStore) {
    return this.storeService.activeInactiveItem(data.id, 'inactive').subscribe(
      (response: IStore) => {},
      (error) => console.log(error)
    );
  }
  // delete brand
  onDeleteHandler(data: IStore) {
    return this.storeService.deleteItem(data.id).subscribe(
      (response: IStore) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onEditHandler(data: IStore) {
    this.button.btn.nativeElement.click();
    this.isEditable = !!data;
    this.editData = data;
    this.selectedImage = data.image;
    this.form.patchValue({
      title: data.title,
      description: data.description,
    });
  }
  // validations
  get title() {
    return this.form.get('title');
  }
}
