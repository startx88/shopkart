import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPage } from 'src/app/models/page.model';
import { PageService } from 'src/app/services/page.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CrudStatus } from 'src/app/utility/enums/crud-status.enum';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  pages$: Observable<IPage[]>;
  form: FormGroup;
  editData: IPage;
  isEditable: boolean = false;
  selectedImage: string;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalBtn') button: ButtonComponent;
  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pages$ = this.pageService.loadData();

    this.form = this.fb.group({
      title: ['', Validators.required],
    });
  }

  // reset form on modal close
  onModalClose() {
    this.form.reset();
    this.selectedImage = '';
  }

  // add / update data
  onAddPage() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.pageService.addPage(this.form.value).subscribe(
      (response: IPage) => {
        this.form.reset();
        this.modal.hide();
      },
      (error) => console.log(error)
    );
  }

  // handler
  onHandler(data: { status: string; item: IPage }) {
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
  onActiveHandler(data: IPage) {
    return this.pageService.activeInactiveItem(data.id, 'active').subscribe(
      (response: IPage) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onDeactiveHandler(data: IPage) {
    return this.pageService.activeInactiveItem(data.id, 'inactive').subscribe(
      (response: IPage) => {},
      (error) => console.log(error)
    );
  }
  // delete brand
  onDeleteHandler(data: IPage) {
    return this.pageService.deleteItem(data.id).subscribe(
      (response: IPage) => {},
      (error) => console.log(error)
    );
  }
  // edit brand
  onEditHandler(data: IPage) {
    this.isEditable = true;
    console.log(this.route, data.slug);
    this.router.navigate([data.slug], {
      relativeTo: this.route,
      queryParams: { isEditing: this.isEditable },
    });
  }

  // validations
  get title() {
    return this.form.get('title');
  }
}
