import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CrudStatus } from 'src/app/utility/enums/crud-status.enum';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories$: Observable<ICategory[]>;
  form: FormGroup;
  editData: ICategory;
  isEditable: boolean = false;
  selectedImage: string;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalBtn') button: ButtonComponent;
  constructor(private fb: FormBuilder, private catService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.catService.loadData();

    this.form = this.fb.group({
      title: ['', Validators.required],
      image: [File],
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
      this.catService
        .addUpdateItem(this.form.value, this.editData.id)
        .subscribe(
          (response: ICategory) => {
            this.form.reset();
            this.modal.hide();
            this.isEditable = false;
            this.editData = null;
          },
          (error) => console.log(error)
        );
    } else {
      this.catService.addUpdateItem(this.form.value).subscribe(
        (response: ICategory) => {
          this.form.reset();
          this.modal.hide();
        },
        (error) => console.log(error)
      );
    }
  }

  // handler
  onHandler(data: { status: string; item: ICategory }) {
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
  onActiveHandler(data: ICategory) {
    return this.catService.activeInactiveItem(data.id, 'active').subscribe(
      (response: ICategory) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onDeactiveHandler(data: ICategory) {
    return this.catService.activeInactiveItem(data.id, 'inactive').subscribe(
      (response: ICategory) => {},
      (error) => console.log(error)
    );
  }
  // delete brand
  onDeleteHandler(data: ICategory) {
    return this.catService.deleteItem(data.id).subscribe(
      (response: ICategory) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onEditHandler(data: ICategory) {
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
