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
    this.booksService
      .getAllBooks(
        this.currentPage,
        this.countItems,
        this.sortBy,
        this.direction
      )
      .subscribe(
        data => {
          this.books = [...data["data"]];
          this.totalPages = data["totalPages"];
          this.currentPage = data["currentPage"];
          this.isLoading = false;
        },
        error => console.log(error)
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
}
