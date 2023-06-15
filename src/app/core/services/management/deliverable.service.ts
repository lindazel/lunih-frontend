import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UrlConstant } from '../../constants/url.constant';
import { PagedResults } from '../../models/common/response-page.model';
import { Deliverable } from '../../models/deliverable.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DeliverableService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.DELIVERABLE;
   }

   getAll(): Observable<Deliverable[]> {
    return this.http.get<Deliverable[]>(this.apiUrl)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
   ): Observable<PagedResults<Deliverable>> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search ?? '')
    .set('sort', sort ?? '')
    .set('column', column ?? '');

    return this.http.get<PagedResults<Deliverable>>(this.apiUrl + '/paging', { params })
    .pipe(catchError(this.handleErrorService.handleError));
   }

   create(model: Deliverable): Observable<Deliverable> {
    return this.http.post<Deliverable>(this.apiUrl, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   update(model: Deliverable, id: number): Observable<Deliverable> {
    return this.http.put<Deliverable>(this.apiUrl + `/${id}`, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   changeStatus(id: number): Observable<Deliverable> {
    return this.http.delete<Deliverable>(this.apiUrl + '/change-status' + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   delete(id: number): Observable<Deliverable> {
    return this.http.delete<Deliverable>(this.apiUrl + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }

}
