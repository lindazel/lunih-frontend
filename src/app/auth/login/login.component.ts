import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../assets/theme/css/main.css']
})
export class LoginComponent implements OnInit {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  form!: FormGroup;
  showPassLogin = false;

  constructor(
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private authService: AuthenticateService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.createFormGroupLogin();
  }

  createFormGroupLogin(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  isFieldValid = this.formValidatorService.isFieldValid;
  displayFieldCss = this.formValidatorService.displayFieldCss;

  toggleShowPassLogin(): void {
    this.showPassLogin = !this.showPassLogin;
  }

  onLoginWithForm() {
    if (this.form.valid) {
      this.authService.doLoginForm(this.form.value)
      .subscribe(res => {
        this.authService.setAuthData(res);
        if (this.authService.checkRoleAdmin()) {
          this.router.navigateByUrl(UrlConstant.ROUTE.MANAGEMENT.DASHBOARD);
        } else {
          this.router.navigateByUrl(UrlConstant.ROUTE.MAIN.HOME);
        }
      })
    } else {
      this.formValidatorService.validateAllFormFields(this.form);
    }
   }

  onLoginWithGoogle() { }

}
