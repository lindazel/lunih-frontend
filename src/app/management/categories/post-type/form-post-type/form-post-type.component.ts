import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { PostType } from 'src/app/core/models/categories/post-type.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { PostTypeService } from 'src/app/core/services/management/categories/post-type.service';

@Component({
  selector: 'app-form-post-type',
  templateUrl: './form-post-type.component.html',
  styleUrls: ['./form-post-type.component.scss']
})
export class FormPostTypeComponent implements OnInit {

  @Input() modalData!: ModalData<PostType>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private postTypeService: PostTypeService,
    private formValidatorService: FormValidatorService,
    private alert: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        nameEn: this.modalData.data?.nameEn,
        nameLv: this.modalData.data?.nameLv
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      nameEn: ['', [Validators.required]],
      nameLv: ['', [Validators.required]]
    });
  }

  onCancel() {
    this.closeModal.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.postTypeService.update(this.form.value, this.modalData.data?.id!)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_UPDATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        });
      } else {
        this.postTypeService.create(this.form.value)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_CREATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        })
      }
    } else {
      this.formValidatorService.validateAllFormFields(this.form);
    }
  }

  isFieldValid = this.formValidatorService.isFieldValid;
  displayFieldCss = this.formValidatorService.displayFieldCss;
  
}
