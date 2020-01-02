import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/empty-name.validator";
import { Location } from "@angular/common";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit() {}

  changeAction() {
    this.authForm.reset();
    this.isError = false;
    this.isRegistered = false;
    this.isLogin = !this.isLogin;
  }

  checkLogin() {
    const { username, password } = this.authForm.value;
    if (this.authForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.isLogin) {
      this.authService.authenticate(username, password).subscribe(
        () => {
          this.location.back();
        },
        error => {
          this.isError = true;
          this.isRegistered = false;
          this.isLoading = false;
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
        () => {
          this.isLoading = false;
          this.errorMessage = "unknownError";
          this.isRegistered = false;
          this.isError = true;
        }
      );
    }
  }
}
