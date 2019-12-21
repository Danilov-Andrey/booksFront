import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/models/book.model";

export interface Titles {
  title: string;
  sortBy: string;
}

@Component({
  selector: "app-book-table",
  templateUrl: "./book-table.component.html",
  styleUrls: ["./book-table.component.css"]
})
export class BookTableComponent implements OnInit {
  @Input() books: Book[];
  @Input() direction: string;
  @Input() sortBy: string;

  selectedBook: number;

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

  constructor() {}

  ngOnInit() {}

  selectBook(id: number) {
    if (this.selectedBook === id) {
      this.selectedBook = -1;
    } else {
      this.selectedBook = id;
    }
  }
}
