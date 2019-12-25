import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/validators";
import { AuthorsService } from "../authors.service";
import { Unsubscribable } from "rxjs";

@Component({
  selector: "app-authors-edit",
  templateUrl: "./authors-edit.component.html",
  styleUrls: ["./authors-edit.component.css"]
})
export class AuthorsEditComponent implements OnInit {
  @Input() id: number;
  @Input() firstName: string;
  @Input() lastName: string;

  setAuthorsPerPage$: Unsubscribable;

  authorForm: FormGroup;
  isLoggedIn: boolean;
  isError: boolean;
  authorsPerPage: number;

  errorMessage: string;
  errorTimer: number;

  constructor(
    private authService: AuthService,
    private authorsService: AuthorsService
  ) {}

  ngOnInit() {
    this.setAuthorsPerPage$ = this.authorsService.setAuthorsPerPage$.subscribe(
      count => {
        this.authorsPerPage = count;
      }
    );

    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authorForm = new FormGroup({
      firstName: new FormControl(this.firstName, [
        Validators.required,
        emptyNameValidator()
      ]),
      lastName: new FormControl(this.lastName, [
        Validators.required,
        emptyNameValidator()
      ])
    });
  }

  ngOnDestroy() {
    this.setAuthorsPerPage$.unsubscribe();
    clearTimeout(this.errorTimer);
  }

  clearTimer() {
    this.isError = false;
    this.errorMessage = null;
  }

  onSubmit() {
    const {
      value: { firstName, lastName }
    } = this.authorForm;
    if (!this.authorForm.valid) {
      this.errorMessage = "invalid";
      this.isError = true;
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }
    if (this.isLoggedIn) {
      if (firstName === this.firstName && lastName === this.lastName) {
        this.isError = true;
        this.errorMessage = "change";
        this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
        return;
      }
      this.isError = false;
      this.errorMessage = null;
      this.authorsService.setLoading$.next();
      this.authorsService.updateAuthor(this.authorsPerPage, {
        id: this.id,
        firstName,
        lastName
      });
    } else {
      this.errorMessage = "login";
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
    }
  }

  deleteAuthor() {
    if (this.isLoggedIn) {
      this.authorsService.setLoading$.next();
      this.authorsService.deleteAuthor(this.id, this.authorsPerPage);
    }
  }
}
