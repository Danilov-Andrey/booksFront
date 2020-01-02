import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { PublishersService } from "../../../services/publishers.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-publishers-create",
  templateUrl: "./publishers-create.component.html",
  styleUrls: ["./publishers-create.component.css"]
})
export class PublishersCreateComponent implements OnInit, OnDestroy {
  publisherForm = new FormGroup({
    name: new FormControl(null, [
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

  ngOnInit(): void {
    this.isLogin = this.authService.isUserLoggedIn();
  }

  ngOnDestroy(): void {
    clearTimeout(this.messageTimer);
  }

  resetParams(): void {
    this.isSaved = false;
    this.isError = false;
    this.successMessage = null;
    this.errorMessage = null;
  }

  savePublisher(): void {
    if (this.publisherForm.valid) {
      clearTimeout(this.messageTimer);
      this.resetParams();
      this.isLoading = true;
      this.publisherService.savePublisher(this.publisherForm.value).subscribe(
        () => {
          this.publisherForm.reset();
          this.isSaved = true;
          this.isLoading = false;
          this.successMessage = "saved";
          this.messageTimer = window.setTimeout(() => this.resetParams(), 5000);
        },
        (error: { error: string }) => {
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
