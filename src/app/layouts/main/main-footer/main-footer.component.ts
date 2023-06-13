import { Component } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss', '../../../../assets/theme/css/main.css']
})
export class MainFooterComponent {

  nowYear = new Date().getFullYear();
  
  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

}
