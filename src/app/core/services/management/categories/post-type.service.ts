import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { HandlerErrorService } from '../../common/handler-error.service';
import { PostType } from 'src/app/core/models/categories/post-type.model';
import { Observable, catchError } from 'rxjs';
import { PagedResults } from 'src/app/core/models/common/response-page.model';

@Injectable({
  providedIn: 'root'
})
export class PostTypeService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.POST_TYPE;
   }

   getAll(): Observable<PostType[]> {
    return this.http.get<PostType[]>(this.apiUrl)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
   ): Observable<PagedResults<PostType>> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search ?? '')
    .set('sort', sort ?? '')
    .set('column', column ?? '');

    return this.http.get<PagedResults<PostType>>(this.apiUrl + '/paging', { params })
    .pipe(catchError(this.handleErrorService.handleError));
   }

   create(model: PostType): Observable<PostType> {
    return this.http.post<PostType>(this.apiUrl, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   update(model: PostType, id: number): Observable<PostType> {
    return this.http.put<PostType>(this.apiUrl + `/${id}`, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   changeStatus(id: number): Observable<PostType> {
    return this.http.delete<PostType>(this.apiUrl + '/change-status' + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   delete(id: number): Observable<PostType> {
    return this.http.delete<PostType>(this.apiUrl + `/${id}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }
}
