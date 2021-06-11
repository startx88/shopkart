import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IColor } from '../models/color.modal';
import { errorHandler } from '../utility';
import { Color } from '../utility/enums/color.enum ';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private data: IColor[] = [];
  dataChanged = new Subject<IColor[]>();
  url: string = environment.apiUrl + '/color';
  constructor(private http: HttpClient, private alertService: AlertService) {}

  // load brands
  loadData() {
    return this.http.get(this.url).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: IColor[]) => {
        this.data = response;
        this.dataChanged.next(this.data.slice());
      })
    );
  }

  // add / update brands
  addUpdateItem(data: IColor, id?: string): Observable<IColor> {
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('color', data.color);
    formdata.append('image', data.image);

    if (id) {
      return this.http.post<IColor>(this.url + '/' + id, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: IColor) => {
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
      return this.http.post<IColor>(this.url, formdata).pipe(
        catchError((error) => errorHandler(error, this.alertService)),
        tap((response: IColor) => {
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
    return this.http.delete<IColor>(this.url + '/' + id).pipe(
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

  activeInactiveItem(id: string, query: string): Observable<IColor> {
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
