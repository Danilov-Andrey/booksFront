import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emptyNameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const { value } = control;
  if (value != null && value.trim().length === 0) {
    return { emptyField: true };
  }
  return null;
}
