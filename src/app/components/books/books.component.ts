import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "../../models/book.model";
import { BooksService } from "../../services/books.service";
import { Unsubscribable } from "rxjs";
import { SortService } from "../../services/sort.service";
import { ActivatedRoute } from "@angular/router";

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
  route$: Unsubscribable;

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
  queryParam: string;
  queryParamId: number;

  constructor(
    private booksService: BooksService,
    private sortService: SortService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe(params => {
      if (params.hasOwnProperty("author-id")) {
        this.queryParam = "author-id";
        this.queryParamId = params["author-id"];
      } else if (params.hasOwnProperty("publisher-id")) {
        this.queryParam = "publisher-id";
        this.queryParamId = params["publisher-id"];
      } else if (params.hasOwnProperty("copies-id")) {
        this.queryParam = "copies-id";
        this.queryParamId = params["copies-id"];
      } else {
        this.queryParam = null;
        this.queryParamId = null;
      }
      this.getBooks();
    });

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
        this.booksService.setDirection$.next(direction);
        this.sortBy = sortBy;
        this.booksService.setSortBy$.next(sortBy);
        this.currentPage = 1;
        this.callGetMethod();
      }
    );

    this.setSuccessMessage$ = this.booksService.setSuccessMessage$.subscribe(
      (message: string) => {
        clearTimeout(this.successMessageTimer);
        this.searchBookName = null;
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
  }

  ngOnDestroy(): void {
    this.booksChanged$.unsubscribe();
    this.errorGet$.unsubscribe();
    this.sortBy$.unsubscribe();
    this.isLoading$.unsubscribe();
    this.setSuccessMessage$.unsubscribe();
    this.route$.unsubscribe();
    clearTimeout(this.successMessageTimer);
  }

  getBooks(): void {
    this.isLoading = true;
    this.searchBookName = null;
    switch (this.queryParam) {
      case "author-id":
        this.booksService.getAuthorBooks(
          this.queryParamId,
          this.currentPage,
          this.countItems,
          this.sortBy,
          this.direction
        );
        break;

      case "publisher-id":
        this.booksService.getPublisherBooks(
          this.queryParamId,
          this.currentPage,
          this.countItems,
          this.sortBy,
          this.direction
        );
        break;

      case "copies-id":
        this.booksService.getBookByCopiesId(this.queryParamId);
        break;

      default:
        this.booksService.getBooks(
          this.currentPage,
          this.countItems,
          this.sortBy,
          this.direction
        );
        break;
    }
  }

  setPaginationData(paginatorInfo: {
    currentPage: number;
    countItems: number;
  }): void {
    this.currentPage = paginatorInfo.currentPage;
    this.countItems = paginatorInfo.countItems;
    this.booksService.setBooksPerPage$.next(this.countItems);
    this.callGetMethod();
  }

  callGetMethod(): void {
    this.searchBookName === null ? this.getBooks() : this.getBook();
  }

  returnInitialData(): void {
    this.searchBookName = name;
    this.currentPage = 1;
    this.getBooks();
  }

  getBook(): void {
    this.isLoading = true;
    this.booksService.findBook(
      this.currentPage,
      this.countItems,
      "id",
      "ASC",
      this.searchBookName
    );
  }

  setSearchMode(name: string): void {
    this.searchBookName = name;
    this.currentPage = 1;
    this.getBook();
  }

  setLoading(): void {
    this.isLoading = true;
  }
}
