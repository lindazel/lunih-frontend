import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { HandlerErrorService } from '../../common/handler-error.service';
import { Faculty } from 'src/app/core/models/categories/faculty.model';
import { Observable, catchError } from 'rxjs';
import { PagedResults } from 'src/app/core/models/common/response-page.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.FACULTY;
   }

   getAll(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.apiUrl)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
   ): Observable<PagedResults<Faculty>> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search ?? '')
    .set('sort', sort ?? '')
    .set('column', column ?? '');

    return this.http.get<PagedResults<Faculty>>(this.apiUrl + '/paging', { params })
    .pipe(catchError(this.handleErrorService.handleError));
   }

   create(model: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(this.apiUrl, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   update(model: Faculty, id: number): Observable<Faculty> {
    return this.http.put<Faculty>(this.apiUrl + `/${id}`, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   changeStatus(id: number): Observable<Faculty> {
    return this.http.delete<Faculty>(this.apiUrl + '/change-status' + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   delete(id: number): Observable<Faculty> {
    return this.http.delete<Faculty>(this.apiUrl + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }
}
