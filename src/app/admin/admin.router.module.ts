import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDetailResolver } from '../resolvers/page-detail.resolver';

import { AdminComponent } from './admin.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { ColorComponent } from './color/color.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { SizeComponent } from './size/size.component';
import { StoreComponent } from './store/store.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { UserComponent } from './user/user.component';

/**
 * Admin routes
 */
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'stores', component: StoreComponent },
      { path: 'brands', component: BrandComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'sub-categories', component: SubCategoryComponent },
      { path: 'colors', component: ColorComponent },
      { path: 'sizes', component: SizeComponent },
      { path: 'pages', component: PagesComponent },
      {
        path: 'pages/:slug',
        component: EditPageComponent,
        resolve: { detail: PageDetailResolver },
      },
      { path: 'users', component: UserComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'setting', component: SettingComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRouterModule {}
