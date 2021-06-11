import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPage } from '../models/page.model';
import { errorHandler } from '../utility';
import { Color } from '../utility/enums/color.enum ';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private data: IPage[] = [];
  private detail: IPage = null;
  dataChanged = new Subject<IPage[]>();
  detailChanged = new Subject<IPage>();
  url: string = environment.apiUrl + '/page';
  constructor(private http: HttpClient, private alertService: AlertService) {}

  // load brands
  loadData(): Observable<IPage[]> {
    return this.http.get<IPage[]>(this.url).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: IPage[]) => {
        this.data = response;
        this.dataChanged.next(this.data.slice());
      })
    );
  }

  // load page by name
  getPageBySlug(slug: string): Observable<IPage> {
    return this.http.get<IPage>(`${this.url}/${slug}`).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: IPage) => {
        console.log('re', response);
        this.detail = response;
        this.detailChanged.next(this.detail);
      })
    );
  }

  // get data by id
  gePageById(id: string): Observable<IPage> {
    return this.http.get<IPage>(this.url).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: IPage) => {
        this.detail = response;
        this.detailChanged.next(this.detail);
      })
    );
  }

  // add
  addPage(page: IPage) {
    console.log(page);
    return this.http.post(this.url, page).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: IPage) => {
        this.data.push(response);
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message: page.title + ' add successfully',
          color: Color.success,
        });
      })
    );
  }

  // update page
  updatePage(page: any, id: string) {
    console.log('page', page);
    //console.log('page', page, id);
    // const formdata = new FormData();
    // formdata.append('excerpt', page.excerpt);
    // formdata.append('content', JSON.stringify(page.content));
    // for (let i = 0; i < page.content.length; i++) {
    //   formdata.append(`image`, page.content[i].image);
    // }
    //console.log(this.url + '/update/' + id);
    return this.http.put(this.url + '/update/' + id, page).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: IPage) => {
        const index = this.data.findIndex((x) => x.id === id);
        this.data[index] = response;
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message: page.title + ' updated successfully',
          color: Color.success,
        });
      })
    );
  }

  // delete brand

  deleteItem(id: string) {
    const confirm = window.confirm('Are you sure you want to delete page.');
    if (!confirm) return new Observable();
    return this.http.delete<IPage>(this.url + '/' + id).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.data.findIndex((x) => x.id === id);
        this.data.splice(index, 1);
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message: 'Page deleted successfully',
          color: Color.danger,
        });
      })
    );
  }

  // delete brand

  activeInactiveItem(id: string, query: string): Observable<IPage> {
    return this.http.put(`${this.url}/${id}?status=${query}`, null).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.data.findIndex((x) => x.id === id);
        this.data[index] = response;
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message: `Page ${
            query == 'active' ? 'activated' : 'inactived'
          } successfully`,
          color: Color.success,
        });
      })
    );
  }

  uploadHero(file: File, id: string): Observable<IPage> {
    const formdata = new FormData();
    formdata.append('hero', file);
    return this.http.put(`${this.url}/upload/${id}`, formdata).pipe(
      catchError((error) => errorHandler(error, this.alertService)),
      tap((response: any) => {
        const index = this.data.findIndex((x) => x.id === id);
        this.data[index] = response;
        this.dataChanged.next(this.data.slice());
        this.alertService.alertShow({
          message: `Page hero uploaded successfully`,
          color: Color.success,
        });
      })
    );
  }
}
