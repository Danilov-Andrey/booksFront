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
      min: "Value less than ",
      max: "Value more than ",
      emptyField: "Field cannot be empty",
      forbidden: "Value incorrect"
    };
    const errors = [];

    if (field.errors.hasOwnProperty("min")) {
      console.log(field.errors);
      config["min"] = config["min"] + field.errors.min.min;
    }

    if (field.errors.hasOwnProperty("max")) {
      console.log(field.errors);
      config["max"] = config["max"] + field.errors.max.max;
    }

    Object.keys(field.errors).map((error: string) => {
      errors.push(config[error]);
    });

    return errors;
  }
}
