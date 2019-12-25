import { Component, OnInit, Input, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-successfull-message",
  templateUrl: "./successfull-message.component.html",
  styleUrls: ["./successfull-message.component.css"]
})
export class SuccessfullMessageComponent implements OnInit {
  @Input() message: string;
  @Input() showMessage: boolean;

  titles = {
    saved: "Saved successfully!",
    deleted: "Deleted successfully!",
    updated: "Updated successfully!"
  };

  outputMessage: string;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.showMessage = changes.showMessage.currentValue;
    this.outputMessage = this.titles[changes.message.currentValue];
  }
}
