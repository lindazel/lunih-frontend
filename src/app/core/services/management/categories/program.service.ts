import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { HandlerErrorService } from '../../common/handler-error.service';
import { Program } from 'src/app/core/models/categories/program.model';
import { Observable, catchError } from 'rxjs';
import { PagedResults } from 'src/app/core/models/common/response-page.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.PROGRAM;
   }

   getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(this.apiUrl)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
   ): Observable<PagedResults<Program>> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search ?? '')
    .set('sort', sort ?? '')
    .set('column', column ?? '');

    return this.http.get<PagedResults<Program>>(this.apiUrl + '/paging', { params })
    .pipe(catchError(this.handleErrorService.handleError));
   }

   create(model: Program): Observable<Program> {
    return this.http.post<Program>(this.apiUrl, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   update(model: Program, id: number): Observable<Program> {
    return this.http.put<Program>(this.apiUrl + `/${id}`, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   changeStatus(id: number): Observable<Program> {
    return this.http.delete<Program>(this.apiUrl + '/change-status' + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   delete(id: number): Observable<Program> {
    return this.http.delete<Program>(this.apiUrl + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }
}
