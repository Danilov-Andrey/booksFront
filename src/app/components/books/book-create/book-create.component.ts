import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { BooksService } from "../books.service";
import { NewBook } from "./book.model";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-book-creator",
  templateUrl: "./book-create.component.html",
  styleUrls: ["./book-create.component.css"]
})
export class BookCreateComponent implements OnInit, OnDestroy {
  bookForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      this.valueValidator(/[0-9]/)
    ]),
    year: new FormControl(null, [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear())
    ]),
    authorFirstName: new FormControl(null, [
      Validators.required,
      this.valueValidator(/[0-9]/)
    ]),
    authorLastName: new FormControl(null, [
      Validators.required,
      this.valueValidator(/[0-9]/)
    ]),
    publisherName: new FormControl(null, Validators.required),
    rate: new FormControl(null, [Validators.max(10), Validators.required]),
    count: new FormControl(null, Validators.required)
  });

  isAuth: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  isSaved: boolean = false;
  successfullMessage: string = "The book was successfully added!";
  errorMessage: string;
  messageTimer: number;

  constructor(
    private booksService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.booksService.setLoading$.subscribe(() => {
      this.isLoading = false;
      this.isSaved = true;
      this.bookForm.reset();
      this.messageTimer = window.setTimeout(() => {
        this.isSaved = false;
      }, 5000);
    });
    this.booksService.errorGet$.subscribe(error => {
      this.isError = true;
      this.isLoading = false;
      this.errorMessage = error;
      this.messageTimer = window.setTimeout(() => {
        this.isError = false;
      }, 5000);
    });
    this.isAuth = this.authService.isUserLoggedIn();
  }

  ngOnDestroy() {
    clearTimeout(this.messageTimer);
  }

  valueValidator(regExp: RegExp): ValidatorFn {
    return (control: AbstractControl) => {
      const forbidden = regExp.test(control.value);
      return forbidden ? { forbidden: true } : null;
    };
  }

  onSubmit() {
    if (this.bookForm.valid && this.isAuth) {
      this.isLoading = true;
      this.booksService.saveBook(this.bookForm.value);
    }
  }
}
