import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthorsService } from "../../services/authors.service";
import { Author } from "src/app/models/author.model";
import { SortService } from "../../services/sort.service";
import { Unsubscribable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

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
  route$: Unsubscribable;

  authors: Author[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  direction: string = "ASC";
  sortBy: string = "id";
  searchAuthorName: string = null;
  queryParam: string;
  totalAuthors: number;
  queryParamId: number;

  isLoading: boolean = true;
  isError: boolean = false;
  isComplete: boolean = false;
  errorMessage: string;
  successMessage: string;
  successMessageTimer: number;

  constructor(
    private authorsService: AuthorsService,
    private sortService: SortService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe(params => {
      if (params.hasOwnProperty("id")) {
        this.queryParam = "id";
        this.queryParamId = params["id"];
        this.searchAuthorName = "";
      } else {
        this.searchAuthorName = null;
        this.queryParam = null;
        this.queryParamId = null;
      }
      this.getAuthors();
    });

    this.authorsChanged$ = this.authorsService.authorsChanged$.subscribe(
      ({ content, totalPages, totalElements, pageable }) => {
        this.currentPage = pageable.pageNumber + 1;
        this.authors = content;
        this.totalPages = totalPages;
        this.totalAuthors = totalElements;
        this.isError = false;
        this.isLoading = false;
        this.errorMessage = null;
      }
    );

    this.errorGet$ = this.authorsService.errorGet$.subscribe(
      (error: string) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error;
      }
    );

    this.sortBy$ = this.sortService.setSort$.subscribe(
      ({ direction, sortBy }) => {
        this.direction = direction;
        this.authorsService.setDirection$.next(direction);
        this.sortBy = sortBy;
        this.authorsService.setSortBy$.next(sortBy);
        this.currentPage = 1;
        this.callGetMethod();
      }
    );

    this.setSuccessMessage$ = this.authorsService.setSuccessMessage$.subscribe(
      (message: string) => {
        clearTimeout(this.successMessageTimer);
        this.searchAuthorName = null;
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
  }

  ngOnDestroy(): void {
    this.authorsChanged$.unsubscribe();
    this.errorGet$.unsubscribe();
    this.sortBy$.unsubscribe();
    this.isLoading$.unsubscribe();
    this.setSuccessMessage$.unsubscribe();
    this.route$.unsubscribe();
    clearTimeout(this.successMessageTimer);
  }

  getAuthors(): void {
    this.isLoading = true;

    switch (this.queryParam) {
      case "id":
        this.authorsService.getAuthorById(this.queryParamId);
        break;

      default:
        this.searchAuthorName = null;
        this.authorsService.getAuthors(
          this.currentPage,
          this.countItems,
          this.sortBy,
          this.direction
        );
    }
  }

  getAuthor(): void {
    this.isLoading = true;
    this.authorsService.getAuthor(
      this.currentPage,
      this.countItems,
      "id",
      "ASC",
      this.searchAuthorName
    );
  }

  setPaginationData(paginatorInfo: {
    currentPage: number;
    countItems: number;
  }): void {
    this.currentPage = paginatorInfo.currentPage;
    this.countItems = paginatorInfo.countItems;
    this.authorsService.setAuthorsPerPage$.next(this.countItems);
    this.callGetMethod();
  }

  callGetMethod(): void {
    this.isLoading = true;
    this.searchAuthorName === null ? this.getAuthors() : this.getAuthor();
  }

  returnInitialData(): void {
    this.currentPage = 1;
    this.searchAuthorName = null;
    this.getAuthors();
  }

  setLoading(): void {
    this.isLoading = true;
  }

  setSearchMode(name: string): void {
    this.searchAuthorName = name;
    this.currentPage = 1;
    this.getAuthor();
  }
}
