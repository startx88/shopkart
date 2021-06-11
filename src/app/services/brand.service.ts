import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBrand } from '../models/brand.model';
import { catchError, tap } from 'rxjs/operators';
import { errorHandler } from '../utility';
import { Observable, Subject } from 'rxjs';
import { AlertService } from './alert.service';
import { Color } from '../utility/enums/color.enum ';
@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private brands: IBrand[] = [];
  branchChanged = new Subject<IBrand[]>();
  url: string = environment.apiUrl + '/brand';
  constructor(private http: HttpClient, private alertService: AlertService) {}

  // load brands
  loadBrands() {
    return this.http.get(this.url).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: IBrand[]) => {
        this.brands = response;
        this.branchChanged.next(this.brands.slice());
      })
    );
  }

  // add / update brands
  addUpdateItem(data: IBrand, id?: string): Observable<IBrand> {
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('image', data.image);
    formdata.append('description', data.description);
    if (id) {
      return this.http.post<IBrand>(this.url + '/' + id, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: IBrand) => {
          const index = this.brands.findIndex((x) => x.id === id);
          this.brands[index] = response;
          this.branchChanged.next(this.brands.slice());
          this.alertService.alertShow({
            message: 'Brand updated successfully',
            color: Color.success,
          });
        })
      );
    } else {
      return this.http.post<IBrand>(this.url, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: IBrand) => {
          this.brands.push(response);
          this.branchChanged.next(this.brands.slice());
          this.alertService.alertShow({
            message: 'Brand add successfully',
            color: Color.success,
          });
        })
      );
    }
  }

  // delete brand

  deleteItem(id: string) {
    const confirm = window.confirm('Are you sure you want to delete');
    if (!confirm) return new Observable();
    return this.http.delete<IBrand>(this.url + '/' + id).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.brands.findIndex((x) => x.id === id);
        this.brands.splice(index, 1);
        this.branchChanged.next(this.brands.slice());
        this.alertService.alertShow({
          message: 'Brand deleted successfully',
          color: Color.danger,
        });
      })
    );
  }

  // delete brand

  activeInactiveItem(id: string, query: string): Observable<IBrand> {
    return this.http.put(`${this.url}/${id}?status=${query}`, null).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.brands.findIndex((x) => x.id === id);
        this.brands[index] = response;
        this.branchChanged.next(this.brands.slice());
        this.alertService.alertShow({
          message: `Brand ${
            query == 'active' ? 'activated' : 'inactived'
          } successfully`,
          color: Color.success,
        });
      })
    );
  }
}
