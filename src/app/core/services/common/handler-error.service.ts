import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UrlConstant } from '../../constants/url.constant';
import { SystemConstant } from '../../constants/system.constant';
import { LanguageConstant } from '../../constants/language.constant';
import { ResponseErrorData } from '../../models/common/response-error.model';

@Injectable({
  providedIn: 'root'
})
export class HandlerErrorService {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  routerNext = '';

  constructor(
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    this.convertError(error.error);
    if (this.langCode === 'en') {
      return throwError(this.langData['en'].ERR_SYSTEM);
    }
    return throwError(this.langData['lv'].ERR_SYSTEM);
  }

  handleErrorForkJoin(): Observable<unknown> {
    return of([]);
  }

  parseErrorBlob(err: HttpErrorResponse): Observable<unknown> {
    const reader: FileReader = new FileReader();

    const obs = new Observable((observer: any) => {
      reader.onloadend = () => {
        observer.error(JSON.parse(reader.result as any));
        observer.complete();
      };
    });
    reader.readAsText(err.error);
    return obs;
  }

  convertError(err: ResponseErrorData): void {
    this.spinner.hide();

    if (this.getToken()) {
      this.routerNext = UrlConstant.ROUTE.LOGIN;
    } else {
      this.routerNext = UrlConstant.ROUTE.MAIN.HOME;
    }

    try {
      if (err) {
        switch (err.status) {
          case 401:
            if (this.langCode === 'en') {
              this.alert.error(this.langData['en'].ACCOUNT_WITHOUT_PRIVILEDGE);
            } else {
              this.alert.error(this.langData['lv'].ACCOUNT_WITHOUT_PRIVILEDGE);
            }
            this.doLogout();
            this.router.navigate([this.routerNext]);
            break;
          case 403:
            if (this.langCode === 'en') {
              this.alert.warning(this.langData['en'].ACCOUNT_WITHOUT_PRIVILEDGE);
            } else {
              this.alert.warning(this.langData['lv'].ACCOUNT_WITHOUT_PRIVILEDGE);
            }
            this.doLogout();
            this.router.navigate([this.routerNext]);
            break;
          default:
            if (err.status === 500) {
              if (this.langCode === 'en') {
                this.alert.error(err.message ?? this.langData['en'].ERR_SYSTEM);
              } else {
                this.alert.error(err.message ?? this.langData['lv'].ERR_SYSTEM);
              }
            } else {
              this.alert.error(err.message);
            }
            break;
        }
      } else {
        if (this.langCode === 'en') {
          this.alert.warning(this.langData['en'].ERR_CONNECT_SERVER);
        } else {
          this.alert.warning(this.langData['lv'].ERR_CONNECT_SERVER);
        }
        this.doLogout();
        this.router.navigate([this.routerNext]);
      }
    } catch (error) {
      if (this.langCode === 'en') {
        this.alert.warning(this.langData['en'].ERR_CONNECT_SERVER);
      } else {
        this.alert.warning(this.langData['lv'].ERR_CONNECT_SERVER);
      }
    }
  }

  doLogout(): void {
    const langCode = localStorage.getItem('language') ?? 'en';
    setTimeout(() => {
      localStorage.clear();
    }, 100);
    setTimeout(() => {
      localStorage.setItem('language', langCode);
    }, 200);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO) || '{}')?.token;
  }
}
