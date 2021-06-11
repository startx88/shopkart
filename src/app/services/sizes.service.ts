import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISize } from '../models/size.modal';
import { errorHandler } from '../utility';
import { Color } from '../utility/enums/color.enum ';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class SizesService {
  private data: ISize[] = [];
  dataChanged = new Subject<ISize[]>();
  url: string = environment.apiUrl + '/size';
  constructor(private http: HttpClient, private alertService: AlertService) {}

  // load brands
  loadData() {
    return this.http.get(this.url).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: ISize[]) => {
        this.data = response;
        this.dataChanged.next(this.data.slice());
      })
    );
  }

  // add / update brands
  addUpdateItem(data: ISize, id?: string): Observable<ISize> {
    console.log('data', data);
    const formdata = {
      title: data.title,
      category: data.category.id,
      sizes: data.sizes,
    };

    if (id) {
      return this.http.post<ISize>(this.url + '/' + id, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: ISize) => {
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
      return this.http.post<ISize>(this.url, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: ISize) => {
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
    return this.http.delete<ISize>(this.url + '/' + id).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.data.findIndex((x) => x.id === id);
        this.data.splice(index, 1);
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message: 'Color deleted successfully',
          color: Color.danger,
        });
      })
    );
  }

  // delete brand

  activeInactiveItem(id: string, query: string): Observable<ISize> {
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
