import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { fromEvent, Unsubscribable, of } from "rxjs";
import { delay, filter, map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements AfterViewInit {
  @ViewChild("search", { static: false }) input: ElementRef;

  @Input() placeholder: string;

  @Output() findValue = new EventEmitter<string>();
  @Output() returnInitialData = new EventEmitter();
  @Output() isLoading = new EventEmitter();

  input$: Unsubscribable;

  isOpen: boolean = false;
  isError: boolean = false;

  errorMessage: string;
  errorTimeout: number;

  ngAfterViewInit(): void {
    this.input$ = fromEvent(this.input.nativeElement, "input")
      .pipe(
        switchMap(userInput =>
          of(userInput).pipe(
            delay(1000),
            map(userInput => userInput["target"].value),
            filter(value => this.validatorInput(value))
          )
        )
      )
      .subscribe((value: string) => {
        clearTimeout(this.errorTimeout);
        this.isError = false;
        this.errorMessage = null;
        this.isOpen = false;
        this.input.nativeElement.value = "";
        this.findValue.emit(value.trim());
      });
  }

  ngOnDestroy(): void {
    this.input$.unsubscribe();
    clearTimeout(this.errorTimeout);
  }

  openSearch(): void {
    this.isOpen = !this.isOpen;
  }

  validatorInput(value: string): boolean {
    if (
      (value.trim().length === 0 && value.length != 0) ||
      value.length === 0
    ) {
      this.isError = true;
      this.errorMessage = "empty";
      this.errorTimeout = window.setTimeout(() => {
        this.isError = false;
        this.errorMessage = null;
      }, 5000);
      return false;
    }
    return true;
  }

  clearField(): void {
    this.isOpen = false;
    this.input.nativeElement.value = "";
    this.returnInitialData.emit();
  }
}
