import { Component, OnInit } from "@angular/core";
import { Book } from "../../models/book.model";
import { BooksService } from "./books.service";

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

  titles: string[] = [
    "ID",
    "Title",
    "Year",
    "Author",
    "Publisher",
    "Count",
    "Condition"
  ];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
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
    this.booksService.getAllBooks(this.currentPage, this.countItems).subscribe(
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
      this.isLoading = true;
      this.getBooks();
    }
  }

  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.isLoading = true;
      this.getBooks();
    }
  }

  getFirstPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.isLoading = true;
      this.getBooks();
    }
  }

  getLastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.isLoading = true;
      this.getBooks();
    }
  }
}
