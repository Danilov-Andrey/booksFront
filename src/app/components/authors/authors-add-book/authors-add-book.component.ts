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

  id: number;
  selectedAuthor: Author;
  errorMessage: string;
  isLoading: boolean = true;
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
  isSaved: boolean;
  successMessage: string;
  isError: boolean;

  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService
  ) {}

  ngOnInit() {
    this.selectedAuthor$ = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.authorsService.getAuthorById(this.id).subscribe(
        (response: Author) => {
          this.isLoading = false;
          this.selectedAuthor = response;
        },
        response => {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = response.error;
        }
      );
    });

    this.setSuccessMessage$ = this.authorsService.setSuccessMessage$.subscribe(
      (message: string) => {
        this.isLoading = false;
        this.isSaved = true;
        this.successMessage = message;
      }
    );
    this.errorGet$ = this.authorsService.errorGet$.subscribe(
      (message: string) => {
        this.isLoading = false;
        this.errorMessage = message;
        this.isError = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedAuthor$.unsubscribe();
  }

  onSubmit() {
    if (this.newBookForm.valid) {
      this.authorsService.addNewBook(this.id, this.newBookForm.getRawValue());
    }
  }
}
