import { Component } from "@angular/core";

@Component({
  selector: "spinner",
  template: `
    <div class="spinner"><mat-spinner></mat-spinner></div>
  `,
  styles: [
    `
      .spinner {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
    `
  ]
})
export class Spinner {}
