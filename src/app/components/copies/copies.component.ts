import { Component, OnInit } from "@angular/core";
import { Unsubscribable } from "rxjs";
import { Copies } from "src/app/models/copies.model";
import { CopiesService } from "./copies.service";
import { SortService } from "../shared/sort/sort.service";

@Component({
  selector: "app-copies",
  templateUrl: "./copies.component.html",
  styleUrls: ["./copies.component.css"]
})
export class CopiesComponent implements OnInit {
  copiesChanged$: Unsubscribable;
  errorGet$: Unsubscribable;
  sortBy$: Unsubscribable;
  isLoading$: Unsubscribable;
  setSuccessMessage$: Unsubscribable;

  copies: Copies[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  direction: string = "ASC";
  sortBy: string = "id";
  searchCopiesId: number;
  totalCopies: number;

  isLoading: boolean = true;
  isError: boolean = false;
  isComplete: boolean = false;
  errorMessage: string;
  successMessage: string;
  successMessageTimer: number;

  constructor(
    private copiesService: CopiesService,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.copiesChanged$ = this.copiesService.copiesChanged$.subscribe(
      ({ content, totalPages, totalElements, pageable }) => {
        this.currentPage = pageable.pageNumber + 1;
        this.copies = content;
        this.totalPages = totalPages;
        this.totalCopies = totalElements;
        this.isError = false;
        this.isLoading = false;
        this.errorMessage = null;
      }
    );

    this.errorGet$ = this.copiesService.errorGet$.subscribe(error => {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = error;
    });

    this.sortBy$ = this.sortService.setSort$.subscribe(
      ({ direction, sortBy }) => {
        this.direction = direction;
        this.copiesService.setDirection$.next(direction);
        this.sortBy = sortBy;
        this.copiesService.setSortBy$.next(sortBy);
        this.currentPage = 1;
        this.callGetMethod();
      }
    );

    this.setSuccessMessage$ = this.copiesService.setSuccessMessage$.subscribe(
      message => {
        clearTimeout(this.successMessageTimer);
        this.searchCopiesId = null;
        this.isComplete = true;
        this.successMessage = message;
        this.successMessageTimer = window.setTimeout(() => {
          this.isComplete = false;
          this.successMessage = null;
        }, 5000);
      }
    );

    this.isLoading$ = this.copiesService.setLoading$.subscribe(() => {
      this.isLoading = true;
    });

    this.getCopies();
  }

  ngOnDestroy() {
    this.copiesChanged$.unsubscribe();
    this.errorGet$.unsubscribe();
    this.sortBy$.unsubscribe();
    this.isLoading$.unsubscribe();
    this.setSuccessMessage$.unsubscribe();
    clearTimeout(this.successMessageTimer);
  }

  getCopies() {
    this.isLoading = true;
    this.searchCopiesId = null;
    this.copiesService.getCopies(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction
    );
  }

  getCopiesById() {
    this.isLoading = true;
    this.copiesService.getCopiesByid(this.searchCopiesId);
  }

  setPaginationData(paginatorInfo: {
    currentPage: number;
    countItems: number;
  }) {
    this.currentPage = paginatorInfo.currentPage;
    this.countItems = paginatorInfo.countItems;
    this.copiesService.setCopiesPerPage$.next(this.countItems);
    this.callGetMethod();
  }

  callGetMethod() {
    this.isLoading = true;
    this.searchCopiesId === null ? this.getCopies() : this.getCopiesById();
  }

  returnInitialData() {
    this.currentPage = 1;
    this.searchCopiesId = null;
    this.getCopies();
  }

  setLoading() {
    this.isLoading = true;
  }

  setSearchMode(id: number) {
    this.searchCopiesId = id;
    this.currentPage = 1;
    this.getCopiesById();
  }
}
