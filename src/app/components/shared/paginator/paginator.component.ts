import { Component, Output, EventEmitter, Input } from "@angular/core";

export interface Item {
  value: number;
}

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

  @Output() setItemsCount = new EventEmitter<number>();
  @Output() getFirstPage = new EventEmitter();
  @Output() getPreviousPage = new EventEmitter();
  @Output() getNextPage = new EventEmitter();
  @Output() getLastPage = new EventEmitter();

  itemsPerPage: Item[] = [
    { value: 5 },
    { value: 10 },
    { value: 20 },
    { value: 50 }
  ];
}
