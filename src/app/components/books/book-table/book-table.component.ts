import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { AuthService } from "src/app/services/auth.service";
import { SortTitles } from "src/app/models/sort-titles.model";

@Component({
  selector: "app-book-table",
  templateUrl: "./book-table.component.html",
  styleUrls: ["./book-table.component.css"]
})
export class BookTableComponent implements OnInit {
  @Input() books: Book[];
  @Input() direction: string;
  @Input() sortBy: string;

  @Input() hideSort: boolean;

  selectedBook: number;
  isLoggedIn: boolean;

  titles: SortTitles[] = [
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

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  selectBook(id: number): void {
    if (this.selectedBook === id) {
      this.selectedBook = -1;
    } else {
      this.selectedBook = id;
    }
  }
}
