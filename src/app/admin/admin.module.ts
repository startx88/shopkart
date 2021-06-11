import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { PagesComponent } from './pages/pages.component';
import { ProductsComponent } from './products/products.component';
import { BrandComponent } from './brand/brand.component';
import { StoreComponent } from './store/store.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { AdminRouterModule } from './admin.router.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProfileComponent,
    SettingComponent,
    CategoryComponent,
    SubCategoryComponent,
    ColorComponent,
    SizeComponent,
    RoleComponent,
    UserComponent,
    PagesComponent,
    ProductsComponent,
    BrandComponent,
    StoreComponent,
    EditPageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRouterModule],
})
export class AdminModule {}
