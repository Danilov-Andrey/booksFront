import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(
    private authentocationService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authentocationService.logOut();
    this.router.navigate(["/login"]);
  }
}
