import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "form-errors",
  templateUrl: "form-errors.component.html",
  styleUrls: ["form-errors.component.css"]
})
export class FormErrorComponent {
  @Input() field: FormControl;

  validatorMessages() {
    const field = this.field;
    if (!field || !field.errors) {
      return false;
    }
    const config = {
      required: "Field is required",
      min: "Year is wrong",
      max: "Year is wrong",
      emptyField: "Field cannot be empty"
    };
    const errors = [];

    // if (field.errors.hasOwnProperty("min")) {
    //   config["min"] += field.errors.min["min"];
    // }

    // if (field.errors.hasOwnProperty("max")) {
    //   config["max"] += field.errors.max["max"];
    // }

    Object.keys(field.errors).map((error: string) => {
      errors.push(config[error]);
    });

    return errors;
  }
}
