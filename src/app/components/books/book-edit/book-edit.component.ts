import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/service/auth.service";
import { BooksService } from "../books.service";
import { UpdateBook } from "src/app/models/update-book.model";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { Unsubscribable } from "rxjs";
import { valueValidator } from "src/app/validators/incorrect-char.validator";

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

  errorTimer: number;

  constructor(
    private authService: AuthService,
    private booksService: BooksService
  ) {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required,
        emptyNameValidator
      ]),
      year: new FormControl(this.year, [
        Validators.required,
        Validators.max(new Date().getFullYear()),
        Validators.min(1900)
      ])
    });
  }

  ngOnDestroy() {
    clearTimeout(this.errorTimer);
  }

  clearTimer() {
    this.isError = false;
    this.errorMessage = "";
  }

  onSubmit() {
    const name = this.editForm.get("name").value;
    const year = this.editForm.get("year").value;
    if (!this.editForm.valid) {
      this.errorMessage = "invalid";
      this.isError = true;
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }

    if (name === this.name && year === this.year) {
      this.errorMessage = "change";
      this.isError = true;
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }
    this.isError = false;
    this.errorMessage = null;
    this.booksService.setLoading$.next();
    this.booksService.updateBook(this.id, new UpdateBook(this.id, name, year));
  }

  deleteBook() {
    if (this.isLoggedIn) {
      this.booksService.setLoading$.next();
      this.booksService.deleteBook(this.id);
    }
  }
}
