import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AppService } from "../../service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  invalidLogin = false;
  isLogin: boolean = true;

  constructor(private router: Router, private loginservice: AppService) {}

  ngOnInit() {}

  changeAction() {
    this.isLogin = !this.isLogin;
  }

  checkLogin() {
    if (this.isLogin) {
      this.loginservice.authenticate(this.username, this.password).subscribe(
        data => {
          this.router.navigate(["/books"]);
          this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
    } else {
      this.loginservice.registration(this.username, this.password).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
