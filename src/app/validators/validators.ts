import { ValidatorFn, AbstractControl } from "@angular/forms";

export function emptyNameValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value.trim().length === 0) {
      return { emptyField: true };
    }
    return null;
  };
}
