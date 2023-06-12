import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.scss'],
})
export class ManagementHeaderComponent implements OnInit {

  constantUrl = UrlConstant;

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  constructor(
    private authService: AuthenticateService
  ) { }

  ngOnInit(): void { }

  doLogout(): void {
    this.authService.doLogout();
  }

  switchLang(lang: string): void {
    localStorage.setItem('language', lang);
    this.langCode = lang;
    window.location.reload();
  }

}
