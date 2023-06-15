import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { University } from 'src/app/core/models/users/university.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.UNIVERSITY;
   }

   getAll(): Observable<University[]> {
    return this.http.get<University[]>(this.apiUrl)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
   ): Observable<PagedResults<University>> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search ?? '')
    .set('sort', sort ?? '')
    .set('column', column ?? '');

    return this.http.get<PagedResults<University>>(this.apiUrl + '/paging', { params })
    .pipe(catchError(this.handleErrorService.handleError));
   }

   create(model: University): Observable<University> {
    return this.http.post<University>(this.apiUrl, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   update(model: University, id: number): Observable<University> {
    return this.http.put<University>(this.apiUrl + `/${id}`, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   changeStatus(id: number): Observable<University> {
    return this.http.delete<University>(this.apiUrl + '/change-status' + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   delete(id: number): Observable<University> {
    return this.http.delete<University>(this.apiUrl + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }
}
