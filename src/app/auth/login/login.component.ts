import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
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
    private formValidatorService: FormValidatorService
    ) { }

  ngOnInit(): void {
    this.createFormGroupLogin();
  }

  createFormGroupLogin(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  isFieldValid = this.formValidatorService.isFieldValid;
  displayFieldCss = this.formValidatorService.displayFieldCss;

  toggleShowPassLogin(): void {
    this.showPassLogin = !this.showPassLogin;
  }

  onLoginWithForm() { }

  onLoginWithGoogle() { }

}
