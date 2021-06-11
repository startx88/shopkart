import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category.model';
import { errorHandler } from '../utility';
import { Color } from '../utility/enums/color.enum ';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private data: ICategory[] = [];
  dataChanged = new Subject<ICategory[]>();
  url: string = environment.apiUrl + '/category';
  constructor(private http: HttpClient, private alertService: AlertService) {}

  // load brands
  loadData() {
    return this.http.get(this.url).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: ICategory[]) => {
        this.data = response;
        this.dataChanged.next(this.data.slice());
      })
    );
  }

  // add / update brands
  addUpdateItem(data: ICategory, id?: string): Observable<ICategory> {
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('image', data.image);
    formdata.append('description', data.description);
    if (id) {
      return this.http.post<ICategory>(this.url + '/' + id, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: ICategory) => {
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
      return this.http.post<ICategory>(this.url, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: ICategory) => {
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
    const confirm = window.confirm('Are you sure you want to delete');
    if (!confirm) return new Observable();
    return this.http.delete<ICategory>(this.url + '/' + id).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.data.findIndex((x) => x.id === id);
        this.data.splice(index, 1);
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message: response.title + ' deleted successfully',
          color: Color.danger,
        });
      })
    );
  }

  // delete brand

  activeInactiveItem(id: string, query: string): Observable<ICategory> {
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
