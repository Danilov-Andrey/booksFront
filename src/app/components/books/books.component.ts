import { Component, OnInit } from "@angular/core";
import { Book } from "../../models/book.model";
import { BooksService } from "./books.service";

export interface Titles {
  title: string;
  sortBy: string;
}

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css", "../../app.component.css"]
})
export class BooksComponent implements OnInit {
  books: Book[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  isLoading: boolean = true;
  isError: boolean = false;
  errorMessage: string = "Pizdosya";
  selectedBook: number;
  direction: string = "ASC";
  sortBy: string = "id";

  titles: Titles[] = [
    { title: "ID", sortBy: "id" },
    { title: "Title", sortBy: "name" },
    { title: "Year", sortBy: "year" },
    { title: "Author's name", sortBy: "author.firstName" },
    { title: "Author's surname", sortBy: "author.lastName" },
    { title: "Publisher", sortBy: "publisher.name" },
    { title: "Count", sortBy: "copies.count" },
    { title: "Condition", sortBy: "copies.rate" }
  ];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.booksChanged$.subscribe(data => {
      this.books = data.content;
      this.totalPages = data.totalPages;
      this.isError = false;
      this.isLoading = false;
      this.errorMessage = null;
      console.log("I WORK TOO", data);
    });

    this.booksService.errorGet$.subscribe(error => {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = error;
      console.log("I WORK ERR", error);
    });
    this.getBooks();
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

    this.getBooks();
  }

  selectBook(id: number) {
    if (this.selectedBook === id) {
      this.selectedBook = -1;
    } else {
      this.selectedBook = id;
    }
  }

  setItemsCount(value: number) {
    if (value != this.countItems) {
      this.countItems = value;
      this.currentPage = 1;
      this.isLoading = true;
      this.getBooks();
    }
  }

  getBooks() {
    this.isLoading = true;
    this.selectedBook = -1;
    this.booksService.getBooks(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction
    );
  }

  getNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getBooks();
    }
  }

  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBooks();
    }
  }

  getFirstPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.getBooks();
    }
  }

  getLastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.getBooks();
    }
  }

  setLoading() {
    this.isLoading = true;
  }
}
