import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Unsubscribable } from "rxjs";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-book-edit",
  templateUrl: "./book-edit.component.html",
  styleUrls: ["./book-edit.component.css"]
})
export class BookEditComponent implements OnInit {
  @Input() name: string;
  @Input() year: number;
  @Input() id: number;

  streamID$: Unsubscribable;

  bookForm: FormGroup;

  ngOnInit() {
    this.bookForm = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      year: new FormControl(this.year, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[1-9]+[0-9]*$/),
        this.checkYear()
      ])
    });
  }

  checkYear(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value <= new Date().getFullYear()) {
        return null;
      }
      return { checkYear: { value: control.value } };
    };
  }
}
