/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { SystemConstant } from '../../constants/system.constant';
import { UrlConstant } from '../../constants/url.constant';
import { AuthModel, LoginFormModel } from '../../models/common/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.LOGIN;
  }

  // common
  getNameOfLogin(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO) || '{}')?.fullName;
  }
  getAvatarOfLogin(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO) || '{}')?.avatar;
  }

  // login google
  doLoginGoogle(token: string): Observable<AuthModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        idToken: token
      })
    };

    return this.http
      .post<AuthModel>(this.apiUrl + `/google`, null, httpOptions)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  // login username/pass
  doLoginForm(model: LoginFormModel): Observable<AuthModel> {
    return this.http
      .post<AuthModel>(this.apiUrl, model)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  // set/ get localStorage model Auth
  getAuthData(): AuthModel {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO) || '{}');
  }

  setAuthData(model: AuthModel): void {
    localStorage.setItem(
      SystemConstant.CURRENT_INFO,
      JSON.stringify(model)
    );
  }

  // logout
  doLogout(): void {
    localStorage.removeItem(SystemConstant.CURRENT_INFO);
    localStorage.removeItem(SystemConstant.CURRENT_INFO_GOOGLE);
    window.location.assign('../');
  }

  // check roles
  checkRoleAdmin(): boolean {
    const auth = this.getAuthData();
    let role = [];
    role = auth.roles.filter(item => item === SystemConstant.ROLE.ADMIN);
    if (role && role.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkRoleStudent(): boolean {
    const auth = this.getAuthData();
    let role = [];
    role = auth.roles.filter(item => item === SystemConstant.ROLE.STUDENT);
    if (role && role.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkRoleUniversity(): boolean {
    const auth = this.getAuthData();
    let role = [];
    role = auth.roles.filter(item => item === SystemConstant.ROLE.UNIVERSITY);
    if (role && role.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkRoleCompany(): boolean {
    const auth = this.getAuthData();
    let role = [];
    role = auth.roles.filter(item => item === SystemConstant.ROLE.COMPANY);
    if (role && role.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
