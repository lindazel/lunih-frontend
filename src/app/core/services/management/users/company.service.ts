import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { Company } from 'src/app/core/models/users/company.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.COMPANY;
   }

   getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
   ): Observable<PagedResults<Company>> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search ?? '')
    .set('sort', sort ?? '')
    .set('column', column ?? '');

    return this.http.get<PagedResults<Company>>(this.apiUrl + '/paging', { params })
    .pipe(catchError(this.handleErrorService.handleError));
   }

   create(model: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   update(model: Company, id: number): Observable<Company> {
    return this.http.put<Company>(this.apiUrl + `/${id}`, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   changeStatus(id: number): Observable<Company> {
    return this.http.delete<Company>(this.apiUrl + '/change-status' + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   delete(id: number): Observable<Company> {
    return this.http.delete<Company>(this.apiUrl + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }
}
