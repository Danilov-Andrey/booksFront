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
      minlength: "Min length is ",
      forbidden: "Value incorrect"
    };
    const errors = [];

    if (field.errors.hasOwnProperty("minlength")) {
      config["minlength"] =
        config["minlength"] + field.errors.minlength.requiredLength;
    }

    if (field.errors.hasOwnProperty("min")) {
      config["min"] = config["min"] + field.errors.min.min;
    }

    if (field.errors.hasOwnProperty("max")) {
      config["max"] = config["max"] + field.errors.max.max;
    }

    Object.keys(field.errors).map((error: string) => {
      errors.push(config[error]);
    });

    return errors;
  }
}
