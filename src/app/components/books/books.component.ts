import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "../../models/book.model";
import { BooksService } from "./books.service";
import { Unsubscribable } from "rxjs";
import { SortService } from "../shared/sort/sort.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css", "../../app.component.css"]
})
export class BooksComponent implements OnInit, OnDestroy {
  booksChanged$: Unsubscribable;
  errorGet$: Unsubscribable;
  sortBy$: Unsubscribable;
  isLoading$: Unsubscribable;
  setSuccessMessage$: Unsubscribable;

  isLoading: boolean = true;
  isError: boolean = false;
  isComplete: boolean = false;
  errorMessage: string;
  successMessage: string;
  successMessageTimer: number;

  books: Book[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  direction: string = "ASC";
  sortBy: string = "id";
  searchBookName: string = null;
  totalBooks: number;

  constructor(
    private booksService: BooksService,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.booksChanged$ = this.booksService.booksChanged$.subscribe(
      ({ content, totalPages, totalElements, pageable }) => {
        this.currentPage = pageable.pageNumber + 1;
        this.books = content;
        this.totalPages = totalPages;
        this.totalBooks = totalElements;
        this.isError = false;
        this.isLoading = false;
        this.errorMessage = null;
      }
    );

    this.errorGet$ = this.booksService.errorGet$.subscribe((error: string) => {
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

    this.setSuccessMessage$ = this.booksService.setSuccessMessage$.subscribe(
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

    this.isLoading$ = this.booksService.setLoading$.subscribe(() => {
      this.isLoading = true;
    });

    this.getBooks();
  }

  ngOnDestroy() {
    this.booksChanged$.unsubscribe();
    this.errorGet$.unsubscribe();
    this.sortBy$.unsubscribe();
    this.isLoading$.unsubscribe();
    this.setSuccessMessage$.unsubscribe();
    clearTimeout(this.successMessageTimer);
  }

  getBooks() {
    this.isLoading = true;
    this.searchBookName = null;
    this.booksService.getBooks(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction
    );
  }

  setPaginationData(paginatorInfo: {
    currentPage: number;
    countItems: number;
  }) {
    this.currentPage = paginatorInfo.currentPage;
    this.countItems = paginatorInfo.countItems;
    this.booksService.setBooksPerPage$.next(this.countItems);
    this.callGetMethod();
  }

  callGetMethod() {
    this.searchBookName === null ? this.getBooks() : this.getBook();
  }

  setInitialValues() {
    this.currentPage = 1;
    this.countItems = 10;
    this.sortBy = "id";
    this.direction = "ASC";
  }

  returnInitialData() {
    this.setInitialValues();
    this.getBooks();
  }

  getBook() {
    this.isLoading = true;
    this.booksService.findBook(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction,
      this.searchBookName
    );
  }

  setSearchMode(name: string) {
    this.searchBookName = name;
    this.setInitialValues();
    this.getBook();
  }

  setLoading() {
    this.isLoading = true;
  }
}
