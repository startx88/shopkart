import { Component, OnInit } from '@angular/core';
import { IFile } from 'src/app/models/file.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPage, IPageContent } from 'src/app/models/page.model';
import { PageService } from 'src/app/services/page.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  page: IPage;
  hero: IFile;
  selectedImage: string;
  form: FormGroup;
  pageContent: IPageContent[] = [];
  public Editor = ClassicEditor;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.page = data['detail'];
    });

    // form
    this.form = this.fb.group({
      excerpt: ['', Validators.required],
      content: this.fb.array([]),
    });
  }

  // select file
  onUpload(file: IFile, index?: number, status?: string) {
    if (status) {
      (<FormArray>this.form.get('content')).controls[index].patchValue({
        image: file,
      });
    } else {
      this.hero = file;
    }
  }

  get contentFormArray() {
    return this.form.get('content') as FormArray;
  }
  // content
  initialContent() {
    return this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  // delete row
  removeRow(index: number) {
    this.contentFormArray.removeAt(index);
  }
  // on add row
  onAddRow() {
    this.contentFormArray.push(this.initialContent());
  }

  onCancel() {}

  // on publish
  onCancelPublish() {}

  onPublish() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return false;
    const formdata = {
      excerpt: this.form.value.excerpt,
      content: this.form.value.content.map((item: any) => ({
        ...item,
        image: item.image.url,
      })),
    };
    this.pageService
      .updatePage(formdata, this.page.id)
      .subscribe((data) => console.log('res', data));
  }

  onUploadHero() {
    if (this.hero) {
      this.pageService.uploadHero(this.hero, this.page.id).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.log('error', error)
      );
    }
  }

  onSaveHero() {}

  // remove image
  onRemoveHero() {
    this.hero = null;
  }

  get excerpt() {
    return this.form.get('excerpt');
  }

  controls(index: number) {
    return (<FormArray>this.form.get('content')).controls[index];
  }
}
