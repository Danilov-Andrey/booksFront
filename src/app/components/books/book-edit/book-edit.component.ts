import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "src/app/service/auth.service";
import { BooksService } from "../books.service";
import { UpdateBook } from "src/app/models/update-book.model";

@Component({
  selector: "app-book-edit",
  templateUrl: "./book-edit.component.html",
  styleUrls: ["./book-edit.component.css"]
})
export class BookEditComponent implements OnInit {
  @Input() name: string;
  @Input() year: number;
  @Input() id: number;

  bookForm: FormGroup;

  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private booksService: BooksService
  ) {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  ngOnInit() {
    this.bookForm = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required,
        this.emptyNameValidator()
      ]),
      year: new FormControl(this.year, [
        Validators.required,
        Validators.max(new Date().getFullYear()),
        Validators.min(1900)
      ])
    });
  }

  emptyNameValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value.trim().length === 0) {
        return { emptyField: true };
      }
      return null;
    };
  }

  onSubmit() {
    const name = this.bookForm.get("name").value;
    const year = this.bookForm.get("year").value;
    if (!this.bookForm.valid) {
      console.log("So clever?");
      return;
    }
    if (this.isLoggedIn) {
      if (name === this.name && year === this.year) {
        console.log("Одинаковые данные");
        return;
      }
      this.booksService
        .updateBook(this.id, new UpdateBook(this.id, name, year))
        .subscribe(data => console.log(data));
    } else {
      console.log("Not login");
    }
  }

  deleteBook() {
    if (this.isLoggedIn) {
      this.booksService
        .deleteBook(this.id)
        .subscribe(data => console.log(data, "FROM DELETE"));
    }
  }
}
