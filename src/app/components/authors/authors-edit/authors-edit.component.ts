import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { AuthorsService } from "../../../services/authors.service";
import { valueValidator } from "src/app/validators/incorrect-char.validator";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-authors-edit",
  templateUrl: "./authors-edit.component.html",
  styleUrls: ["./authors-edit.component.css"]
})
export class AuthorsEditComponent implements OnInit {
  @Input() id: number;
  @Input() firstName: string;
  @Input() lastName: string;

  authorForm: FormGroup;
  isLoggedIn: boolean;
  isError: boolean;

  errorMessage: string;
  errorTimer: number;

  constructor(
    private authService: AuthService,
    private authorsService: AuthorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authorForm = new FormGroup({
      firstName: new FormControl(this.firstName, [
        Validators.required,
        valueValidator(/[0-9]/),
        emptyNameValidator
      ]),
      lastName: new FormControl(this.lastName, [
        Validators.required,
        valueValidator(/[0-9]/),
        emptyNameValidator
      ])
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.errorTimer);
  }

  clearTimer(): void {
    this.isError = false;
    this.errorMessage = null;
  }

  onSubmit(): void {
    const {
      value: { firstName, lastName }
    } = this.authorForm;
    if (!this.authorForm.valid) {
      this.errorMessage = "invalid";
      this.isError = true;
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }

    if (firstName === this.firstName && lastName === this.lastName) {
      this.isError = true;
      this.errorMessage = "change";
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }
    this.clearTimer();
    this.authorsService.updateAuthor({
      id: this.id,
      firstName,
      lastName
    });
  }

  deleteAuthor(): void {
    if (this.isLoggedIn) {
      this.authorsService.deleteAuthor(this.id);
    }
  }

  addBook(): void {
    this.router.navigate([`${this.id}/new-book`], { relativeTo: this.route });
  }

  getBooks(): void {
    this.router.navigate([
      `books`,
      {
        "author-id": this.id
      }
    ]);
  }
}
