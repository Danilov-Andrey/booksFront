import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { AuthService } from "src/app/service/auth.service";

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
  isLoggedIn: boolean;

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  selectBook(id: number) {
    if (this.selectedBook === id) {
      this.selectedBook = -1;
    } else {
      this.selectedBook = id;
    }
  }
}
