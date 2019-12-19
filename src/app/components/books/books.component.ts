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

  isLoading: boolean = true;
  isError: boolean = false;
  errorMessage: string;

  books: Book[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  direction: string = "ASC";
  sortBy: string = "id";
  searchBookName: string = "";

  constructor(
    private booksService: BooksService,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.booksChanged$ = this.booksService.booksChanged$.subscribe(
      ({ content, totalPages }) => {
        this.books = content;
        this.totalPages = totalPages;
        this.isError = false;
        this.isLoading = false;
        this.errorMessage = null;
      }
    );

    this.errorGet$ = this.booksService.errorGet$.subscribe(error => {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = error;
    });

    this.sortBy$ = this.sortService.setSort$.subscribe((value: string) => {
      this.onSortBy(value);
    });

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

    this.searchBookName === "" ? this.getBooks() : this.getBook();
  }

  getBooks() {
    this.isLoading = true;
    this.searchBookName = "";
    this.booksService.getBooks(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction
    );
  }

  setItemsCount(value: number) {
    if (value != this.countItems) {
      this.countItems = value;
      this.currentPage = 1;
      this.isLoading = true;
      this.searchBookName === "" ? this.getBooks() : this.getBook();
    }
  }

  getNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchBookName === "" ? this.getBooks() : this.getBook();
    }
  }

  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchBookName === "" ? this.getBooks() : this.getBook();
    }
  }

  getFirstPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.searchBookName === "" ? this.getBooks() : this.getBook();
    }
  }

  getLastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.searchBookName === "" ? this.getBooks() : this.getBook();
    }
  }

  setLoading() {
    this.isLoading = true;
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
}
