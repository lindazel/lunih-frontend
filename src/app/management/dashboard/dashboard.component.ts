import { Component } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode]['DASHBOARD']
  });

  

}
