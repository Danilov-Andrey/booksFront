import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin-button",
  templateUrl: "./signin-button.component.html",
  styleUrls: ["./signin-button.component.css"]
})
export class SigninButtonComponent {
  constructor(private router: Router) {}

  redirectToSignin(): void {
    this.router.navigate(["/login"]);
  }
}
