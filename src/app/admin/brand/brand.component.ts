import { query } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { IBrand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CrudStatus } from 'src/app/utility/enums/crud-status.enum';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  brands$: Observable<IBrand[]>;
  form: FormGroup;
  isEditable: boolean = false;
  editData: IBrand;
  selectedImage: string;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalBtn') button: ButtonComponent;
  constructor(private fb: FormBuilder, private brandService: BrandService) {}

  ngOnInit(): void {
    // load brand
    this.brands$ = this.brandService.loadBrands();

    this.form = this.fb.group({
      title: ['', Validators.required],
      image: [File],
      description: [''],
    });
  }

  // add / update brand
  onAddBrand() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    if (this.isEditable) {
      this.brandService
        .addUpdateItem(this.form.value, this.editData.id)
        .subscribe(
          (response: IBrand) => {
            this.form.reset();
            this.modal.hide();
            this.isEditable = false;
            this.editData = null;
          },
          (error) => console.log(error)
        );
    } else {
      this.brandService.addUpdateItem(this.form.value).subscribe(
        (response: IBrand) => {
          this.form.reset();
          this.modal.hide();
        },
        (error) => console.log(error)
      );
    }
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

  // handler
  onHandler(data: { status: string; item: IBrand }) {
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
  onActiveHandler(data: IBrand) {
    return this.brandService.activeInactiveItem(data.id, 'active').subscribe(
      (response: IBrand) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onDeactiveHandler(data: IBrand) {
    return this.brandService.activeInactiveItem(data.id, 'inactive').subscribe(
      (response: IBrand) => {},
      (error) => console.log(error)
    );
  }
  // delete brand
  onDeleteHandler(data: IBrand) {
    return this.brandService.deleteItem(data.id).subscribe(
      (response: IBrand) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onEditHandler(data: IBrand) {
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
