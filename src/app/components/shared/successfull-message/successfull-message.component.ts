import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-successfull-message",
  templateUrl: "./successfull-message.component.html",
  styleUrls: ["./successfull-message.component.css"]
})
export class SuccessfullMessageComponent implements OnInit {
  @Input() message: string;
  @Input() showMessage: boolean;
  constructor() {}

  ngOnInit() {}
}
