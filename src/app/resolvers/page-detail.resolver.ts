import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPage } from '../models/page.model';
import { PageService } from '../services/page.service';

@Injectable({
  providedIn: 'root',
})
export class PageDetailResolver implements Resolve<IPage> {
  constructor(private pageService: PageService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPage> {
    const slug = route.paramMap.get('slug');

    return this.pageService.getPageBySlug(slug);
  }
}
