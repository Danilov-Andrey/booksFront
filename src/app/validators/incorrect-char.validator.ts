import { ValidatorFn, AbstractControl } from "@angular/forms";

export function valueValidator(regExp: RegExp): ValidatorFn {
  return (control: AbstractControl) => {
    const forbidden = regExp.test(control.value);
    return forbidden ? { forbidden: true } : null;
  };
}
