import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Unsubscribable } from "rxjs";
import { AuthorsService } from "../authors.service";
import { Author } from "src/app/models/author.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";

@Component({
  selector: "app-authors-add-book",
  templateUrl: "./authors-add-book.component.html",
  styleUrls: ["./authors-add-book.component.css"]
})
export class AuthorsAddBookComponent implements OnInit, OnDestroy {
  selectedAuthor$: Unsubscribable;
  setSuccessMessage$: Unsubscribable;
  errorGet$: Unsubscribable;
  authorChanged$: Unsubscribable;

  isSaved: boolean;
  successMessage: string;
  isError: boolean;
  id: number;
  selectedAuthor: Author;
  errorMessage: string;
  isLoading: boolean = true;
  messageTimer: number;
  newBookForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(255),
      emptyNameValidator
    ]),
    year: new FormControl(null, [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear())
    ]),
    publisherName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(255),
      emptyNameValidator
    ]),
    rate: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(10)
    ]),
    count: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(100000)
    ])
  });

  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService
  ) {}

  ngOnInit() {
    this.selectedAuthor$ = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.authorsService.getAuthorById(this.id);
    });

    this.authorChanged$ = this.authorsService.authorsChanged$.subscribe(
      (response: { content: Author[] }) => {
        this.isLoading = false;
        this.selectedAuthor = response.content[0];
      }
    );

    this.setSuccessMessage$ = this.authorsService.setSuccessMessage$.subscribe(
      (message: string) => {
        this.newBookForm.reset();
        this.isLoading = false;
        this.isSaved = true;
        this.successMessage = message;
        this.messageTimer = window.setTimeout(() => {
          this.resetParams();
        }, 5000);
      }
    );
    this.errorGet$ = this.authorsService.errorGet$.subscribe(
      (message: string) => {
        this.isLoading = false;
        this.isError = true;
        this.isSaved = false;
        this.errorMessage = message;
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedAuthor$.unsubscribe();
    this.setSuccessMessage$.unsubscribe();
    this.errorGet$.unsubscribe();
    clearTimeout(this.messageTimer);
  }

  onSubmit() {
    if (this.newBookForm.valid) {
      clearTimeout(this.messageTimer);
      this.resetParams();
      this.isLoading = true;
      this.authorsService.addNewBook(this.id, this.newBookForm.getRawValue());
    }
  }

  resetParams() {
    this.isSaved = false;
    this.successMessage = null;
  }
}
