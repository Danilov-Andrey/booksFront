import { Component, OnInit, OnDestroy } from "@angular/core";
import { BooksService } from "../../../services/books.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Unsubscribable } from "rxjs";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { valueValidator } from "src/app/validators/incorrect-char.validator";

@Component({
  selector: "app-book-creator",
  templateUrl: "./book-create.component.html",
  styleUrls: ["./book-create.component.css"]
})
export class BookCreateComponent implements OnInit, OnDestroy {
  bookForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      emptyNameValidator,
      Validators.maxLength(255)
    ]),
    year: new FormControl(null, [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear())
    ]),
    authorFirstName: new FormControl(null, [
      Validators.required,
      emptyNameValidator,
      Validators.maxLength(255),
      valueValidator(/[0-9]/)
    ]),
    authorLastName: new FormControl(null, [
      Validators.required,
      emptyNameValidator,
      Validators.maxLength(255),
      valueValidator(/[0-9]/)
    ]),
    publisherName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(255),
      emptyNameValidator
    ]),
    rate: new FormControl(null, [
      Validators.max(10),
      Validators.min(1),
      Validators.required
    ]),
    count: new FormControl(null, [
      Validators.required,
      Validators.max(100000),
      Validators.min(0)
    ])
  });

  isAuth: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  isSaved: boolean = false;
  errorMessage: string;
  messageTimer: number;
  successMessage: string;

  errorGet$: Unsubscribable;
  setSuccessMessage$: Unsubscribable;

  constructor(
    private booksService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setSuccessMessage$ = this.booksService.setSuccessMessage$.subscribe(
      (message: string) => {
        this.successMessage = message;
        this.isLoading = false;
        this.isSaved = true;
        this.bookForm.reset();
        this.messageTimer = window.setTimeout(() => {
          this.isSaved = false;
        }, 5000);
      }
    );
    this.errorGet$ = this.booksService.errorGet$.subscribe((error: string) => {
      this.isError = true;
      this.isLoading = false;
      this.errorMessage = error;
      this.messageTimer = window.setTimeout(() => {
        this.isError = false;
      }, 5000);
    });
    this.isAuth = this.authService.isUserLoggedIn();
  }

  ngOnDestroy(): void {
    this.setSuccessMessage$.unsubscribe();
    this.errorGet$.unsubscribe();
    clearTimeout(this.messageTimer);
  }

  onSubmit(): void {
    if (this.bookForm.valid && this.isAuth) {
      this.isLoading = true;
      this.booksService.saveBook(this.bookForm.value);
    }
  }
}
