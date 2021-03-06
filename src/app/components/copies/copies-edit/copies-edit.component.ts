import { Component, OnInit, Input } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { CopiesService } from "../../../services/copies.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-copies-edit",
  templateUrl: "./copies-edit.component.html",
  styleUrls: ["./copies-edit.component.css"]
})
export class CopiesEditComponent implements OnInit {
  @Input() id: number;
  @Input() rate: number;
  @Input() count: number;

  copiesForm: FormGroup;
  isLoggedIn: boolean;
  isError: boolean;
  authorsPerPage: number;

  errorMessage: string;
  errorTimer: number;

  constructor(
    private authService: AuthService,
    private copiesService: CopiesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.copiesForm = new FormGroup({
      rate: new FormControl(this.rate, [
        Validators.required,
        Validators.min(1),
        Validators.max(10)
      ]),
      count: new FormControl(this.count, [
        Validators.required,
        Validators.min(0),
        Validators.max(100000)
      ])
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.errorTimer);
  }

  clearTimer(): void {
    this.isError = false;
    this.errorMessage = null;
  }

  onSubmit(): void {
    const {
      value: { rate, count }
    } = this.copiesForm;
    if (!this.copiesForm.valid) {
      this.errorMessage = "invalid";
      this.isError = true;
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }

    if (rate === this.rate && count === this.count) {
      this.isError = true;
      this.errorMessage = "change";
      this.errorTimer = window.setTimeout(() => this.clearTimer(), 5000);
      return;
    }
    this.clearTimer();
    this.copiesService.updateCopies({
      id: this.id,
      rate,
      count
    });
  }

  getBook(): void {
    this.router.navigate([
      "books",
      {
        "copies-id": this.id
      }
    ]);
  }
}
