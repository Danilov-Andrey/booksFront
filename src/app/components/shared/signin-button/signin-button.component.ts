import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin-button",
  templateUrl: "./signin-button.component.html",
  styleUrls: ["./signin-button.component.css"]
})
export class SigninButtonComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  redirectToSignin() {
    this.router.navigate(["/login"]);
  }
}
