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

  editForm: FormGroup;
  isLoggedIn: boolean;
  errorMessage: string;
  isError: boolean;
  booksPerPage: number;

  constructor(
    private authService: AuthService,
    private booksService: BooksService
  ) {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  ngOnInit() {
    this.booksService.setBooksPerPage$.subscribe(booksPerPage => {
      this.booksPerPage = booksPerPage;
    });
    this.editForm = new FormGroup({
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
    const name = this.editForm.get("name").value;
    const year = this.editForm.get("year").value;
    if (!this.editForm.valid) {
      this.errorMessage = "Form invalid";
      this.isError = true;
      return;
    }
    if (this.isLoggedIn) {
      if (name === this.name && year === this.year) {
        this.errorMessage = "Nothing was changed";
        this.isError = true;
        return;
      }
      this.isError = false;
      this.errorMessage = null;
      this.booksService.setLoading$.next();
      this.booksService.updateBook(
        this.id,
        this.booksPerPage,
        new UpdateBook(this.id, name, year)
      );
    } else {
      this.errorMessage = "You must sign in";
    }
  }

  deleteBook() {
    if (this.isLoggedIn) {
      this.booksService.setLoading$.next();
      this.booksService.deleteBook(this.id, this.booksPerPage);
    }
  }
}
