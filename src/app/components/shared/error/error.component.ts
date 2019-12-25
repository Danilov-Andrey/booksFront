import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent implements OnInit {
  @Input() message: string;

  titles = {
    login: "You must sign in for these actions!",
    change: "Nothing was changed!",
    invalid: "Form is invalid!",
    empty: "Field cannot be empty"
  };

  outputMessage: string;

  constructor() {}

  ngOnInit() {
    if (this.titles.hasOwnProperty(this.message)) {
      this.outputMessage = this.titles[this.message];
    } else {
      this.outputMessage = this.message;
    }
  }
}
