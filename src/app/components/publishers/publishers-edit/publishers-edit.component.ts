import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/service/auth.service";
import { PublishersService } from "../publishers.service";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { Router } from "@angular/router";

@Component({
  selector: "app-publishers-edit",
  templateUrl: "./publishers-edit.component.html",
  styleUrls: ["./publishers-edit.component.css"]
})
export class PublishersEditComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;

  publisherForm: FormGroup;
  isLoggedIn: boolean;
  isError: boolean;

  errorMessage: string;
  errorTimer: number;

  constructor(
    private authService: AuthService,
    private publishersService: PublishersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.publisherForm = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required,
        emptyNameValidator
      ])
    });
  }

  ngOnDestroy() {
    clearTimeout(this.errorTimer);
  }

  clearTimer() {
    this.isError = false;
    this.errorMessage = null;
  }

  onSubmit() {
    const {
      value: { name }
    } = this.publisherForm;
    if (!this.publisherForm.valid) {
      this.errorMessage = "invalid";
      this.isError = true;
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }
    if (name === this.name) {
      this.isError = true;
      this.errorMessage = "change";
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }
    this.clearTimer();
    this.publishersService.setLoading$.next();
    this.publishersService.updatePublisher({
      id: this.id,
      name
    });
  }

  deletePublisher() {
    if (this.isLoggedIn) {
      this.publishersService.setLoading$.next();
      this.publishersService.deletePublisher(this.id);
    }
  }

  getBooks() {
    this.router.navigate([
      `books`,
      {
        "publisher-id": this.id
      }
    ]);
  }
}
