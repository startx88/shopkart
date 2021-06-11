import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { ISize } from 'src/app/models/size.modal';
import { CategoryService } from 'src/app/services/category.service';
import { SizesService } from 'src/app/services/sizes.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CrudStatus } from 'src/app/utility/enums/crud-status.enum';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent implements OnInit, AfterViewChecked {
  sizes$: Observable<ISize[]>;
  categories$: Observable<ICategory[]>;
  tags: string[] = [];
  form: FormGroup;
  editData: ISize;
  isEditable: boolean = false;
  selectedImage: string;
  defaultCategory: ICategory = null;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalBtn') button: ButtonComponent;
  constructor(
    private fb: FormBuilder,
    private catService: CategoryService,
    private sizeService: SizesService
  ) {}

  ngOnInit(): void {
    this.sizes$ = this.sizeService.loadData();
    this.categories$ = this.catService.loadData();
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      sizes: this.fb.array([]),
    });
  }

  // select file
  onUpload(file: File) {
    this.form.patchValue({
      image: file,
    });
  }

  ngAfterViewChecked() {
    this.form.patchValue({
      sizes: this.tags,
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
  onAddUpdate() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const data = {
      title: this.form.value.title,
      category: this.form.value.category,
      sizes: this.tags,
    };
    if (this.isEditable) {
      this.sizeService.addUpdateItem(data, this.editData.id).subscribe(
        (response: ISize) => {
          this.form.reset();
          this.modal.hide();
          this.isEditable = false;
          this.editData = null;
        },
        (error) => console.log(error)
      );
    } else {
      console.log('hi');
      this.sizeService.addUpdateItem(data).subscribe(
        (response: ISize) => {
          this.form.reset();
          this.modal.hide();
        },
        (error) => console.log(error)
      );
    }
  }

  // handler
  // handler
  onHandler(data: { status: string; item: ISize }) {
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
  onActiveHandler(data: ISize) {
    return this.sizeService.activeInactiveItem(data.id, 'active').subscribe(
      (response: ISize) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onDeactiveHandler(data: ISize) {
    return this.sizeService.activeInactiveItem(data.id, 'inactive').subscribe(
      (response: ISize) => {},
      (error) => console.log(error)
    );
  }
  // delete brand
  onDeleteHandler(data: ISize) {
    return this.sizeService.deleteItem(data.id).subscribe(
      (response: ISize) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onEditHandler(data: ISize) {
    this.button.btn.nativeElement.click();
    this.isEditable = !!data;
    this.editData = data;
    this.defaultCategory = data.category;
    this.tags.push(...data.sizes);
    this.form.patchValue({
      title: data.title,
      category: data.category,
      size: data.sizes,
    });
  }
  // validations
  get title() {
    return this.form.get('title');
  }
}
