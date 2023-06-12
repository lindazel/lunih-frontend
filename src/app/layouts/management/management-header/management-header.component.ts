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
  isToggleSidebar = false;
  isToggleRightSideBar = false;
  user = '';

  constructor(
    private authService: AuthenticateService
  ) { }

  ngOnInit(): void {
    if (this.authService.getAuthData()) {
      // this.user = this.authService.getAuthData;
    }
  }

  toggleSidebar(): void {
    if (!this.toggleSidebar) {
      document.getElementById('container')?.classList.remove('mainnav-lg');
      document.getElementById('container')?.classList.add('mainnav-sm');
    } else {
      document.getElementById('container')?.classList.remove('mainnav-sm');
      document.getElementById('container')?.classList.add('mainnav-lg');
    }
    this.isToggleSidebar = !this.isToggleSidebar;
  }

  // window click
  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {

  }

  openModal(template: TemplateRef<any>): void {

  }

  hidePopup(): void {

  }

  doLogout(): void {
    this.authService.doLogout();
  }

}
