import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDetailResolver } from './resolvers/page-detail.resolver';
import { PageService } from './services/page.service';
import { ContainerComponent } from './views/container/container.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

/**
 * App Router module
 */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about',
    component: ContainerComponent,
    resolve: { detail: PageDetailResolver },
  },
  {
    path: 'contact',
    component: ContainerComponent,
    resolve: { detail: PageDetailResolver },
  },
  {
    path: 'privacy',
    component: ContainerComponent,
    resolve: { detail: PageDetailResolver },
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
