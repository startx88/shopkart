import {
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { ISubCategory } from 'src/app/models/subcat.model';
import { CategoryService } from 'src/app/services/category.service';
import { SubcatService } from 'src/app/services/subcat.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CrudStatus } from 'src/app/utility/enums/crud-status.enum';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit, AfterContentInit {
  categories$: Observable<ICategory[]>;
  subcategories$: Observable<ISubCategory[]>;
  form: FormGroup;
  editData: ISubCategory;
  isEditable: boolean = false;
  selectedImage: string;
  defaultCategory: ICategory = null;

  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalBtn') button: ButtonComponent;
  constructor(
    private fb: FormBuilder,
    private catService: CategoryService,
    private subcatService: SubcatService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.catService.loadData();
    this.subcategories$ = this.subcatService.loadData();
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      image: [File],
      description: [''],
    });
  }

  ngAfterContentInit(): void {
    this.defaultCategory = null;
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
    this.defaultCategory = null;
  }

  // add / update data
  onAddUpdateSubCategory() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    if (this.isEditable) {
      this.subcatService
        .addUpdateItem(this.form.value, this.editData.id)
        .subscribe(
          (response: ISubCategory) => {
            this.form.reset();
            this.modal.hide();
            this.isEditable = false;
            this.editData = null;
          },
          (error) => console.log(error)
        );
    } else {
      this.subcatService.addUpdateItem(this.form.value).subscribe(
        (response: ISubCategory) => {
          this.form.reset();
          this.modal.hide();
        },
        (error) => console.log(error)
      );
    }
  }

  // handler
  onHandler(data: { status: string; item: ISubCategory }) {
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
  onActiveHandler(data: ISubCategory) {
    return this.subcatService.activeInactiveItem(data.id, 'active').subscribe(
      (response: ISubCategory) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onDeactiveHandler(data: ISubCategory) {
    return this.subcatService.activeInactiveItem(data.id, 'inactive').subscribe(
      (response: ICategory) => {},
      (error) => console.log(error)
    );
  }
  // delete brand
  onDeleteHandler(data: ISubCategory) {
    return this.subcatService.deleteItem(data.id).subscribe(
      (response: ISubCategory) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onEditHandler(data: ISubCategory) {
    this.button.btn.nativeElement.click();
    this.isEditable = !!data;
    this.editData = data;
    this.selectedImage = data.image;
    this.defaultCategory = data.category;
    this.form.patchValue({
      title: data.title,
      description: data.description,
      category: data.category,
    });
  }
  // validations
  get title() {
    return this.form.get('title');
  }
}
