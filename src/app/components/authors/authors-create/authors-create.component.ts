import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { valueValidator } from "src/app/validators/incorrect-char.validator";
import { AuthorsService } from "../../../services/authors.service";
import { Unsubscribable } from "rxjs";

@Component({
  selector: "app-authors-create",
  templateUrl: "./authors-create.component.html",
  styleUrls: ["./authors-create.component.css"]
})
export class AuthorsCreateComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  isLoading: boolean;

  message: string;
  isError: boolean;
  showMessage: boolean;

  setSuccessMessage$: Unsubscribable;
  errorGet$: Unsubscribable;

  messageTimer: number;

  authorForm = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      emptyNameValidator,
      Validators.maxLength(255),
      valueValidator(/[0-9]/)
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      emptyNameValidator,
      Validators.maxLength(255),
      valueValidator(/[0-9]/)
    ])
  });

  constructor(
    private authService: AuthService,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.setSuccessMessage$ = this.authorsService.setSuccessMessage$.subscribe(
      (message: string) => {
        this.message = message;
        this.showMessage = true;
        this.isLoading = false;
        this.isError = false;
        this.authorForm.reset();
        this.messageTimer = window.setTimeout(() => this.resetParams(), 5000);
      }
    );
    this.errorGet$ = this.authorsService.errorGet$.subscribe(
      (message: string) => {
        this.message = message;
        this.showMessage = false;
        this.isError = true;
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    clearTimeout(this.messageTimer);
  }

  onSubmit(): void {
    if (this.authorForm.valid && this.isLoggedIn) {
      clearTimeout(this.messageTimer);
      this.resetParams();
      this.isLoading = true;
      this.authorsService.saveAuthor(this.authorForm.value);
    }
  }

  resetParams(): void {
    this.showMessage = false;
    this.isError = false;
    this.message = null;
  }
}
