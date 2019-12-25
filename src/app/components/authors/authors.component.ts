import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthorsService } from "./authors.service";
import { Author } from "src/app/models/author.model";
import { SortService } from "../shared/sort/sort.service";
import { Unsubscribable } from "rxjs";

@Component({
  selector: "app-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.css"]
})
export class AuthorsComponent implements OnInit, OnDestroy {
  authorsChanged$: Unsubscribable;
  errorGet$: Unsubscribable;
  sortBy$: Unsubscribable;
  isLoading$: Unsubscribable;
  setSuccessMessage$: Unsubscribable;

  authors: Author[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  direction: string = "ASC";
  sortBy: string = "id";
  searchAuthorName: string = null;
  totalAuthors: number;

  isLoading: boolean = true;
  isError: boolean = false;
  isComplete: boolean = false;
  errorMessage: string;
  successMessage: string;
  successMessageTimer: number;

  constructor(
    private authorsService: AuthorsService,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.authorsChanged$ = this.authorsService.authorsChanged$.subscribe(
      ({ content, totalPages, totalElements }) => {
        this.authors = content;
        this.totalPages = totalPages;
        this.totalAuthors = totalElements;
        this.isError = false;
        this.isLoading = false;
        this.errorMessage = null;
      }
    );

    this.errorGet$ = this.authorsService.errorGet$.subscribe(error => {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = error;
    });

    this.sortBy$ = this.sortService.setSort$.subscribe(
      ({ direction, sortBy }) => {
        this.direction = direction;
        this.sortBy = sortBy;
        this.currentPage = 1;
        this.callGetMethod();
      }
    );

    this.setSuccessMessage$ = this.authorsService.setSuccessMessage$.subscribe(
      message => {
        clearTimeout(this.successMessageTimer);

        this.isComplete = true;
        this.successMessage = message;
        this.successMessageTimer = window.setTimeout(() => {
          this.isComplete = false;
          this.successMessage = null;
        }, 5000);
      }
    );

    this.isLoading$ = this.authorsService.setLoading$.subscribe(() => {
      this.isLoading = true;
    });

    this.getAuthors();
  }

  ngOnDestroy() {
    this.authorsChanged$.unsubscribe();
    this.errorGet$.unsubscribe();
    this.sortBy$.unsubscribe();
    this.isLoading$.unsubscribe();
    this.setSuccessMessage$.unsubscribe();
    clearTimeout(this.successMessageTimer);
  }

  getAuthors() {
    this.isLoading = true;
    this.searchAuthorName = null;
    this.authorsService.getAuthors(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction
    );
  }

  getAuthor() {
    this.isLoading = true;
    this.authorsService.getAuthor(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction,
      this.searchAuthorName
    );
  }

  setPaginationData(paginatorInfo: {
    currentPage: number;
    countItems: number;
  }) {
    this.currentPage = paginatorInfo.currentPage;
    this.countItems = paginatorInfo.countItems;
    this.callGetMethod();
  }

  callGetMethod() {
    this.isLoading = true;
    this.searchAuthorName === null ? this.getAuthors() : this.getAuthor();
  }

  setInitialValues() {
    this.currentPage = 1;
    this.countItems = 10;
    this.sortBy = "id";
    this.direction = "ASC";
  }

  returnInitialData() {
    this.setInitialValues();
    this.getAuthors();
  }

  setLoading() {
    this.isLoading = true;
  }

  setSearchMode(name: string) {
    this.searchAuthorName = name;
    this.setInitialValues();
    this.getAuthor();
  }
}
