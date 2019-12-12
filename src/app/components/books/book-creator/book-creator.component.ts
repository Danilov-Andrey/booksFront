import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { BooksService } from "../books.service";
import { SaveBook } from "../book.model";

@Component({
  selector: "app-book-creator",
  templateUrl: "./book-creator.component.html",
  styleUrls: ["./book-creator.component.css"]
})
export class BookCreatorComponent implements OnInit {
  books: Book[] = [];

  name: string;
  year: number;
  authorFirstName: string;
  authorLastName: string;
  publisherName: string;
  rate: number;
  count: number;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    // this.booksService.getBooks().subscribe({
    //   next(data) {
    //     console.log(data);
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    //   complete() {
    //     console.log("done");
    //   }
    // });
  }

  saveBook() {
    const newBook = new SaveBook(
      this.name,
      this.year,
      this.authorFirstName,
      this.authorLastName,
      this.publisherName,
      this.rate,
      this.count
    );
    console.log(newBook);
    this.booksService.saveBook(newBook).subscribe(data => console.log(data));
  }
}
