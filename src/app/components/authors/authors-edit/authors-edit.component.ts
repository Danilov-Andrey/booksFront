import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emptyNameValidator } from "src/app/validators/validators";

@Component({
  selector: "app-authors-edit",
  templateUrl: "./authors-edit.component.html",
  styleUrls: ["./authors-edit.component.css"]
})
export class AuthorsEditComponent implements OnInit {
  @Input() id: number;
  @Input() firstName: string;
  @Input() lastName: string;

  authorForm: FormGroup;
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authorForm = new FormGroup({
      firstName: new FormControl(this.firstName, [
        Validators.required,
        emptyNameValidator()
      ]),
      lastName: new FormControl(this.lastName, [
        Validators.required,
        emptyNameValidator()
      ])
    });
  }
}
