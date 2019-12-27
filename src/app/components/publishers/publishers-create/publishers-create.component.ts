import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { PublishersService } from "../publishers.service";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-publishers-create",
  templateUrl: "./publishers-create.component.html",
  styleUrls: ["./publishers-create.component.css"]
})
export class PublishersCreateComponent implements OnInit, OnDestroy {
  publisherForm = new FormGroup({
    publisherName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(255),
      emptyNameValidator
    ])
  });
  isLoading: boolean;
  isLogin: boolean;
  isSaved: boolean;
  isError: boolean;
  successMessage: string;
  errorMessage: string;

  messageTimer: number;

  constructor(
    private publisherService: PublishersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLogin = this.authService.isUserLoggedIn();
  }

  ngOnDestroy(): void {
    clearTimeout(this.messageTimer);
  }

  resetParams() {
    this.isSaved = false;
    this.isError = false;
    this.successMessage = null;
    this.errorMessage = null;
  }

  savePublisher() {
    const { publisherName: name } = this.publisherForm.value;
    if (this.publisherForm.valid) {
      clearTimeout(this.messageTimer);
      this.resetParams();
      this.isLoading = true;
      this.publisherService.savePublisher(name).subscribe(
        () => {
          this.publisherForm.reset();
          this.isSaved = true;
          this.isLoading = false;
          this.successMessage = "saved";
          this.messageTimer = window.setTimeout(() => this.resetParams(), 5000);
        },
        error => {
          clearTimeout(this.messageTimer);
          this.isSaved = false;
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = error.error;
          this.messageTimer = window.setTimeout(() => this.resetParams(), 5000);
        }
      );
    }
  }
}
