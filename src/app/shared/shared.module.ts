import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { AlertComponent } from './components/alert/alert.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PanelComponent } from './components/panel/panel.component';
import { TagCreatorComponent } from './components/tag-creator/tag-creator.component';
import { TagCreatorDirective } from './directives/tag-creator.directive';
import { TitleComponent } from './components/title/title.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [
    LogoComponent,
    PageTitleComponent,
    CapitalizePipe,
    ButtonComponent,
    ModalComponent,
    UploaderComponent,
    AlertComponent,
    DataTableComponent,
    PanelComponent,
    TagCreatorComponent,
    TagCreatorDirective,
    TitleComponent,
    PublicLayoutComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,

    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CKEditorModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LogoComponent,
    PageTitleComponent,
    CapitalizePipe,
    ButtonComponent,
    ModalComponent,
    UploaderComponent,
    AlertComponent,
    DataTableComponent,
    PanelComponent,
    TagCreatorComponent,
    TagCreatorDirective,
    CKEditorModule,
    TitleComponent,
    PublicLayoutComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
  ],
})
export class SharedModule {}
