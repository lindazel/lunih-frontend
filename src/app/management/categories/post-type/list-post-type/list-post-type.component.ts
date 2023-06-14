import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PostType } from 'src/app/core/models/categories/post-type.model';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { PostTypeService } from 'src/app/core/services/management/categories/post-type.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-post-type',
  templateUrl: './list-post-type.component.html',
  styleUrls: ['./list-post-type.component.scss']
})
export class ListPostTypeComponent implements OnInit {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  breadcrumObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode]['POST_TYPE'],
    listBreadcrumb: [{
      title: this.langData[this.langCode]['CATEGORIES'],
      link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES
    }]
  });

  modalData: ModalData<PostType> = new ModalData<PostType>();
  listPostType: Paginate<PostType> = new Paginate<PostType>();
  searchValue = '';

  constructor(
    private postTypeService: PostTypeService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalService: NzModalService,
  ) { }
  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(isSearch?: boolean): void {
    if (isSearch) {
      this.listPostType.currentPage = 1;
    }
    this.spinner.show();
    this.postTypeService.getAllPaging(
      this.listPostType.currentPage - 1,
      this.listPostType.limit,
      this.searchValue
    ).subscribe(res => {
      this.listPostType.currentPage = res.pageable.pageNumber + 1;
      this.listPostType.limit = res.pageable.pageSize;
      this.listPostType.totalPage = res.totalPages;
      this.listPostType.totalItem = res.totalElements;
      this.listPostType.data = res.content;
    }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<any>, data?: PostType) {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }

    this.nzModalService.create({
      nzStyle: {top: '20px'},
      nzWidth: 500,
      nzTitle: (data?.id ? this.langData[this.langCode]['EDIT_TITLE'] : this.langData[this.langCode]['ADD_TITLE']) + this.langData[this.langCode]['POST_TYPE'],
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean) {
    if (reload) {
      this.listPostType.currentPage = 1;
      this.getDataPaging();
    }
    this.nzModalService.closeAll()
  }

  pageChange(page: Paginate<PostType>) {
    this.listPostType = page;
    this.getDataPaging();
  }

  changeStatus(id: number) {
    this.nzModalService.confirm({
      nzTitle: this.langData[this.langCode]['CONFIRM_CHANGE_STATUS'],
      nzCancelText: this.langData[this.langCode]['CANCEL'],
      nzOkText: this.langData[this.langCode]['CONFIRM'],
      nzOkDanger: true,
      nzOnOk: () => {
        this.spinner.show();
        this.postTypeService.changeStatus(id)
        .subscribe(() => {
          this.alert.success(this.langData[this.langCode]['MSG_CHANGE_DONE']);
          this.closeModal(true);
          this.spinner.hide();
        },
        () => this.spinner.hide());
      }
    })
  }

  delete(id: number) {
    this.nzModalService.confirm({
      nzTitle: this.langData[this.langCode]['CONFIRM_DELETE'],
      nzCancelText: this.langData[this.langCode]['CANCEL'],
      nzOkText: this.langData[this.langCode]['CONFIRM'],
      nzOkDanger: true,
      nzOnOk: () => {
        this.spinner.show();
        this.postTypeService.delete(id)
        .subscribe(() => {
          this.alert.success(this.langData[this.langCode]['MSG_CHANGE_DONE']);
          this.closeModal(true);
          this.spinner.hide();
        },
        () => this.spinner.hide());
      }
    })
  }
  
}

