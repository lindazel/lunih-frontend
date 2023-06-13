import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss', '../../../../assets/theme/css/main.css']
})
export class MainHeaderComponent implements OnInit {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  isLogin = false;
  isStudent = false;
  isUniversity = false;
  isCompany = false;

  userName = 'John Evans';
  userAvatarLink = '';
  // userAvatarLink = 'http://localhost:4200/assets/img/120_logo.png';


  showCart = false;

  constructor(
    // private router: Router,
    private authService: AuthenticateService,
  ) { }

  ngOnInit(): void {
    // const lang = localStorage.getItem('language');
    // if (lang) {
    //   this.langCode = lang;
    // } else {
    //   localStorage.setItem('language', 'en');
    //   this.langCode = 'en';
    // }
  }

  doLogout(): void {
    this.authService.doLogout();
  }

  switchLang(lang: string): void {
    localStorage.setItem('language', lang);
    this.langCode = lang;
    window.location.reload();
  }

}
