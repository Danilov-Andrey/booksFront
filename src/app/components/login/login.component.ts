import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLogin: boolean = true;
  successMessage: string;
  errorMessage: string;
  isError: boolean = false;
  isRegistered: boolean = false;
  isLoading: boolean = false;
  authForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      emptyNameValidator
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      emptyNameValidator
    ])
  });

  constructor(private authService: AuthService, private router: Router) {}

  changeAction(): void {
    this.authForm.reset();
    this.isError = false;
    this.isRegistered = false;
    this.isLogin = !this.isLogin;
  }

  checkLogin(): void {
    const { username, password } = this.authForm.value;
    if (this.authForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.isLogin) {
      this.authService.authenticate(username, password).subscribe(
        () => {
          this.router.navigate(["/books"]);
        },
        error => {
          this.isError = true;
          this.isRegistered = false;
          this.isLoading = false;
          console.log(error);
          if (error.status === 401) {
            this.errorMessage = "invalidData";
          } else {
            this.errorMessage = "unknownError";
          }
        }
      );
    } else {
      this.authService.registration(username, password).subscribe(
        () => {
          this.isLoading = false;
          this.successMessage = "registered";
          this.isRegistered = true;
          this.isError = false;
        },
        (error: { error: string }) => {
          this.isLoading = false;
          this.errorMessage = error.error;
          this.isRegistered = false;
          this.isError = true;
        }
      );
    }
  }
}
