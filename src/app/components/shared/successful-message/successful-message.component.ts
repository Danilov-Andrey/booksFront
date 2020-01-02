import { Component, Input, SimpleChanges, OnChanges } from "@angular/core";

@Component({
  selector: "app-successful-message",
  templateUrl: "./successful-message.component.html",
  styleUrls: ["./successful-message.component.css"]
})
export class SuccessfulMessageComponent implements OnChanges {
  @Input() message: string;

  titles = {
    saved: "Saved successfully!",
    deleted: "Deleted successfully!",
    updated: "Updated successfully!",
    registered: "Registered successfully!"
  };

  outputMessage: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.outputMessage = this.titles[changes.message.currentValue];
  }
}
