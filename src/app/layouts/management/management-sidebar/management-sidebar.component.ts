import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.scss']
})
export class ManagementSidebarComponent implements OnInit {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  
  userName = 'John Evans';

  listMenu: {
    icon: string;
    title: string;
    routerLink: string;
    isHaveChild: boolean;
    listChild: {
      icon: string;
      title: string;
      routerLink: string;
    }[];
  }[] = [];

  ngOnInit(): void {
    this.listMenu = [
      {
        icon: 'fas fa-solar-panel',
        title: this.langData[this.langCode]['DASHBOARD'],
        routerLink: UrlConstant.ROUTE.MANAGEMENT.DASHBOARD,
        isHaveChild: false,
        listChild: []
      },
      {
        icon: 'pic-left',
        title: this.langData[this.langCode]['CATEGORIES'],
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-university',
            title: this.langData[this.langCode]['FACULTY'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.FACULTY
          },
        ]
      },
    ]
    
  }

}
