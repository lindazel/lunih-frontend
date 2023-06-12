import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paginate } from './paginate.model';

@Component({
  selector: 'table-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class TablePaginateComponent implements OnInit {
  @Input() pageConfig!: Paginate;
  @Output() pageChange: EventEmitter<Paginate> = new EventEmitter<Paginate>();
  @Output() numOfItemChange: EventEmitter<Paginate> = new EventEmitter<Paginate>();
  constructor() { }

  ngOnInit(): void { }

  setPage(page: number): void {
    if (page > 0 && page <= this.pageConfig.totalPage! && page !== this.pageConfig.currentPage) {
      this.pageConfig.currentPage = page;
      this.refreshPage();
    }
  }

  changedPage(event: Event): void {
    const page: number = +(event.target as HTMLInputElement).value;
    if (page - 1 > 0 && page - 1 < this.pageConfig.totalPage!) {
      this.pageConfig.currentPage = page;
      this.refreshPage();
    } else {
      this.pageConfig.currentPage = 1;
      this.refreshPage();
    }
  }

  changedNumOfItem(event: Event): void {
    const numOfItem = (event.target as HTMLInputElement).value;
    this.pageConfig.limit = Number.parseInt(numOfItem, 10);
    this.pageConfig.currentPage = 1;
    this.refreshPage();
  }

  refreshPage(): void {
    this.pageChange.emit(this.pageConfig);
  }
}