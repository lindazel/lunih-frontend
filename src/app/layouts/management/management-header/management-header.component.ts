import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.scss'],
  providers: [AuthenticateService]
})
export class ManagementHeaderComponent implements OnInit {

  constantUrl = UrlConstant;
  
  constructor(
    private authService: AuthenticateService
  ) { }

  ngOnInit(): void { }

  doLogout(): void {
    this.authService.doLogout();
  }

}
