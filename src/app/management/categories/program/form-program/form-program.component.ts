import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Faculty } from 'src/app/core/models/categories/faculty.model';
import { Industry } from 'src/app/core/models/categories/industry.model';
import { Program } from 'src/app/core/models/categories/program.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { FacultyService } from 'src/app/core/services/management/categories/faculty.service';
import { IndustryService } from 'src/app/core/services/management/categories/industry.service';
import { ProgramService } from 'src/app/core/services/management/categories/program.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-program',
  templateUrl: './form-program.component.html',
  styleUrls: ['./form-program.component.scss']
})
export class FormProgramComponent implements OnInit {

  @Input() modalData!: ModalData<Program>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  form!: FormGroup;
  listIndustry: Paginate<Industry> = new Paginate<Industry>();
  listFaculty!: Faculty[];

  // Search params
  searchIndustryValueChanged = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private industryService: IndustryService,
    private facultyService: FacultyService,
    private formValidatorService: FormValidatorService,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getDataFaculty();
    this.searchIndustryValueChanged.pipe(debounceTime(300))
    .subscribe(searchValue => {
      this.getDataIndustry(searchValue);
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.listIndustry.data = [...this.modalData.data?.industryList!];
      this.form.patchValue({
        nameEn: this.modalData.data?.nameEn,
        nameLv: this.modalData.data?.nameLv,
        studyLevel: this.modalData.data?.studyLevel,
        facultyID: this.modalData.data?.faculty.id,
        industryList: this.modalData.data?.industryList.map(item => item.id),
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      nameEn: ['', [Validators.required]],
      nameLv: ['', [Validators.required]],
      studyLevel: ['', [Validators.required]],
      facultyID: [0, [Validators.required]],
      industryList: [[], [Validators.required]]
    });
  }

  getDataIndustry(searchValue?: string) {
    this.industryService.getAllPaging(0, 10, searchValue)
    .subscribe(res => {
      this.listIndustry.data = res.content.filter(x => x.status);
    });
  }

  getDataFaculty() {
    this.facultyService.getAll()
    .subscribe(res => {
      this.listFaculty = res.filter(x => x.status);
    })
  }

  onCancel() {
    this.closeModal.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.programService.update(this.form.value, this.modalData.data?.id!)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_UPDATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        });
      } else {
        this.programService.create(this.form.value)
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
