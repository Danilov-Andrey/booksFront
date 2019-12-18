import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { BooksService } from "../../books/books.service";
import { fromEvent, Unsubscribable, of } from "rxjs";
import { delay, filter, map, switchMap, catchError } from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {
  @ViewChild("search", { static: false }) input: ElementRef;

  @Input() countItems: number;
  @Input() placeholder: string;
  @Input() searchType: string;

  @Output() isLoading = new EventEmitter();

  input$: Unsubscribable;

  isOpen: boolean = false;

  lastUserInputValue: string;

  constructor(private booksService: BooksService) {}

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
              if (value === "") {
                this.booksService.getBooks(1, this.countItems, "id", "ASC");
              } else {
                this.booksService.findBook(
                  1,
                  this.countItems,
                  "id",
                  "ASC",
                  this.lastUserInputValue.trim()
                );
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
      this.booksService.errorGet$.next("Field cannot be empty");
      return false;
    }
    return true;
  }

  clearField() {
    if (this.lastUserInputValue != "") {
      this.isOpen = false;
      this.input.nativeElement.value = "";
      this.isLoading.emit();
      this.booksService.getBooks(1, this.countItems, "id", "ASC");
    }
  }
}
