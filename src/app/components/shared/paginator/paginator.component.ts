import { Component, Output, EventEmitter, Input } from "@angular/core";
import {
  PaginationInfo,
  PaginationItemCount
} from "src/app/models/pagination.model";

@Component({
  selector: "app-paginator",
  templateUrl: "paginator.component.html",
  styleUrls: ["paginator.component.css"]
})
export class Paginator {
  @Input() totalPages: number;
  @Input() currentPage: number;
  @Input() countItems: number;
  @Input() totalElements: number;

  @Output() setPaginationData = new EventEmitter<PaginationInfo>();

  itemsPerPage: PaginationItemCount[] = [
    { value: 5 },
    { value: 10 },
    { value: 20 },
    { value: 50 }
  ];

  setItemsCount(value: number): void {
    if (value != this.countItems) {
      this.countItems = value;
      this.setPaginationData.emit({
        currentPage: 1,
        countItems: this.countItems
      });
    }
  }

  getNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginationData.emit({
        currentPage: this.currentPage,
        countItems: this.countItems
      });
    }
  }

  getPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginationData.emit({
        currentPage: this.currentPage,
        countItems: this.countItems
      });
    }
  }

  getFirstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.setPaginationData.emit({
        currentPage: this.currentPage,
        countItems: this.countItems
      });
    }
  }

  getLastPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.setPaginationData.emit({
        currentPage: this.currentPage,
        countItems: this.countItems
      });
    }
  }
}
