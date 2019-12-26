import { Component, OnInit, Input, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-successfull-message",
  templateUrl: "./successfull-message.component.html",
  styleUrls: ["./successfull-message.component.css"]
})
export class SuccessfullMessageComponent implements OnInit {
  @Input() message: string;

  titles = {
    saved: "Saved successfully!",
    deleted: "Deleted successfully!",
    updated: "Updated successfully!",
    registered: "Registered successfully!"
  };

  outputMessage: string;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.outputMessage = this.titles[changes.message.currentValue];
  }
}
