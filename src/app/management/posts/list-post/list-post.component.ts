import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/management/post.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  breadcrumObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode]['POST'],
    listBreadcrumb: [{
      title: this.langData[this.langCode]['POST_MANAGEMENT'],
      link: UrlConstant.ROUTE.MANAGEMENT.POST_MANAGEMENT
    }]
  });

  modalData: ModalData<Post> = new ModalData<Post>();
  listPost: Paginate<Post> = new Paginate<Post>();
  
  searchValue = '';

  constructor(
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalService: NzModalService,
  ) {}

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(isSearch?: boolean): void {
    if(isSearch) {
      this.listPost.currentPage = 1;
    }
    this.spinner.show();
    this.postService.getAllPaging(
      this.listPost.currentPage - 1,
      this.listPost.limit,
      this.searchValue
    ).subscribe(res => {
      this.listPost.currentPage = res.pageable.pageNumber + 1;
      this.listPost.limit = res.pageable.pageSize;
      this.listPost.totalPage = res.totalPages;
      this.listPost.totalItem = res.totalElements;
      this.listPost.data = res.content;
    }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<any>, data?: Post) {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }

    this.nzModalService.create({
      nzStyle: {top: '20px'},
      nzWidth: 1000,
      nzTitle: (data?.id ? this.langData[this.langCode]['EDIT_TITLE'] : this.langData[this.langCode]['ADD_TITLE']) + this.langData[this.langCode]['POST'],
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean) {
    if (reload) {
      this.listPost.currentPage = 1;
      this.getDataPaging();
    }
    this.nzModalService.closeAll()
  }

  pageChange(page: Paginate<Post>) {
    this.listPost = page;
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
        this.postService.changeStatus(id)
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
        this.postService.delete(id)
        .subscribe(() => {
          this.alert.success(this.langData[this.langCode]['MSG_CHANGE_DONE']);
          this.closeModal(true);
          this.spinner.hide();
        },
        () => {
          this.spinner.hide()
        });
      }
    })
  }

}
