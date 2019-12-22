import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-authors-create",
  templateUrl: "./authors-create.component.html",
  styleUrls: ["./authors-create.component.css"]
})
export class AuthorsCreateComponent implements OnInit {
  isLoggedIn: boolean;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }
}
