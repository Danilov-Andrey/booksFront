import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { fromEvent, Unsubscribable, of } from "rxjs";
import { delay, filter, map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {
  @ViewChild("search", { static: false }) input: ElementRef;

  @Input() placeholder: string;

  @Output() findValue = new EventEmitter<string>();
  @Output() returnInitialData = new EventEmitter();
  @Output() isLoading = new EventEmitter();

  input$: Unsubscribable;
  isOpen: boolean = false;
  lastUserInputValue: string = "";
  errorMessage: string = "";
  errorTimeout: number;
  isError: boolean = false;

  ngAfterViewInit() {
    this.input$ = fromEvent(this.input.nativeElement, "input")
      .pipe(
        switchMap(userInput =>
          of(userInput).pipe(
            delay(1000),
            map(userInput => {
              this.lastUserInputValue = userInput["target"].value;
              return this.lastUserInputValue;
            }),
            filter(value => this.validatorInput(value)),
            map(value => {
              this.isLoading.emit();
              clearTimeout(this.errorTimeout);
              this.isError = false;
              this.errorMessage = "";
              if (value === "") {
                this.returnInitialData.emit();
              } else {
                this.findValue.emit(this.lastUserInputValue.trim());
              }
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.input$.unsubscribe();
  }

  openSearch() {
    this.isOpen = !this.isOpen;
  }

  validatorInput(value: string) {
    if (value.trim().length === 0 && value.length != 0) {
      this.isError = true;
      this.errorMessage = "Field cannot be empty";
      this.errorTimeout = window.setTimeout(() => {
        this.isError = false;
        this.errorMessage = "";
      }, 5000);
      return false;
    }
    return true;
  }

  clearField() {
    if (this.lastUserInputValue != "") {
      this.isOpen = false;
      this.input.nativeElement.value = "";
      this.returnInitialData.emit();
    }
  }
}
