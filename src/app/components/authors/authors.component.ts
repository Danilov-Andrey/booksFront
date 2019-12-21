import { Component, OnInit } from "@angular/core";
import { AuthorsService } from "./authors.service";
import { Author } from "src/app/models/author.model";
import { SortService } from "../shared/sort/sort.service";
import { Unsubscribable } from "rxjs";

@Component({
  selector: "app-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.css"]
})
export class AuthorsComponent implements OnInit {
  authorsChanged$: Unsubscribable;
  errorGet$: Unsubscribable;
  sortBy$: Unsubscribable;
  isLoading$: Unsubscribable;

  authors: Author[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  direction: string = "ASC";
  sortBy: string = "id";
  searchAuthorName: string = "";
  totalAuthors: number;

  isLoading: boolean = true;
  isError: boolean = false;
  errorMessage: string;

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

    this.sortBy$ = this.sortService.setSort$.subscribe((sortBy: string) => {
      this.onSortBy(sortBy);
    });

    this.isLoading$ = this.authorsService.setLoading$.subscribe(() => {
      this.isLoading = true;
    });

    this.getAuthors();
  }

  getAuthors() {
    this.isLoading = true;
    this.searchAuthorName = "";
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

  onSortBy(sortBy: string) {
    if (sortBy === this.sortBy) {
      if (this.direction === "ASC") {
        this.direction = "DESC";
      } else {
        this.direction = "ASC";
      }
    } else {
      this.sortBy = sortBy;
      this.direction = "ASC";
    }
    this.getAuthors();
  }

  setItemsCount(value: number) {
    if (value != this.countItems) {
      this.countItems = value;
      this.currentPage = 1;
      this.isLoading = true;
      this.authorsService.setAuthorsPerPage$.next(value);
      this.searchAuthorName === "" ? this.getAuthors() : this.getAuthor();
    }
  }

  getNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchAuthorName === "" ? this.getAuthors() : this.getAuthor();
    }
  }

  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchAuthorName === "" ? this.getAuthors() : this.getAuthor();
    }
  }

  getFirstPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.searchAuthorName === "" ? this.getAuthors() : this.getAuthor();
    }
  }

  getLastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.searchAuthorName === "" ? this.getAuthors() : this.getAuthor();
    }
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
