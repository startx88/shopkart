import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISubCategory } from '../models/subcat.model';
import { errorHandler } from '../utility';
import { Color } from '../utility/enums/color.enum ';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class SubcatService {
  private data: ISubCategory[] = [];
  dataChanged = new Subject<ISubCategory[]>();
  url: string = environment.apiUrl + '/subcat';
  constructor(private http: HttpClient, private alertService: AlertService) {}

  // load brands
  loadData() {
    return this.http.get(this.url).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: ISubCategory[]) => {
        this.data = response;
        this.dataChanged.next(this.data.slice());
      })
    );
  }

  // add / update brands
  addUpdateItem(data: ISubCategory, id?: string): Observable<ISubCategory> {
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('image', data.image);
    formdata.append('description', data.description);
    formdata.append('category', data.category.id);
    if (id) {
      return this.http.post<ISubCategory>(this.url + '/' + id, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: ISubCategory) => {
          const index = this.data.findIndex((x) => x.id === id);
          this.data[index] = response;
          this.dataChanged.next(this.data.slice());
          this.alertService.alertShow({
            message: data.title + ' updated successfully',
            color: Color.success,
          });
        })
      );
    } else {
      return this.http.post<ISubCategory>(this.url, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: ISubCategory) => {
          this.data.push(response);
          this.dataChanged.next(this.data.slice());
          this.alertService.alertShow({
            message: data.title + ' add successfully',
            color: Color.success,
          });
        })
      );
    }
  }

  // delete brand

  deleteItem(id: string) {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (!confirm) return new Observable();
    return this.http.delete<ISubCategory>(this.url + '/' + id).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.data.findIndex((x) => x.id === id);
        this.data.splice(index, 1);
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message: 'Sub category deleted successfully',
          color: Color.danger,
        });
      })
    );
  }

  // delete brand

  activeInactiveItem(id: string, query: string): Observable<ISubCategory> {
    return this.http.put(`${this.url}/${id}?status=${query}`, null).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.data.findIndex((x) => x.id === id);
        this.data[index] = response;
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message:
            response.title +
            ` ${query == 'active' ? 'activated' : 'inactived'} successfully`,
          color: Color.success,
        });
      })
    );
  }
}
