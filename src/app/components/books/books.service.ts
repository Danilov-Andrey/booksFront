import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UpdateBook } from "src/app/models/update-book.model";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  booksChanged$ = new Subject<any>();
  errorGet$ = new Subject<string>();
  setLoading$ = new Subject();
  setBooksPerPage$ = new BehaviorSubject<number>(10);
  setSortBy$ = new BehaviorSubject<string>("id");
  setDirection$ = new BehaviorSubject<string>("ASC");
  setSuccessMessage$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  saveBook(newBook) {
    this.http.post("http://localhost:8080/api/books", newBook).subscribe(
      () => {
        this.setSuccessMessage$.next("saved");
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getBooks(
    pageNumber: number,
    rowPerPage: number,
    sortBy: string,
    direction: string
  ) {
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("rowPerPage", rowPerPage.toString())
      .set("sortBy", sortBy.toString())
      .set("direction", direction.toString());
    this.http.get(`http://localhost:8080/api/books`, { params }).subscribe(
      response => {
        this.booksChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getBookByID(id: number) {
    return this.http.get(`http://localhost:8080/api/books/${id}`);
  }

  updateBook(id: number, updateBook: UpdateBook) {
    this.http
      .patch(`http://localhost:8080/api/books/${id}`, updateBook)
      .subscribe(
        () => {
          this.setSuccessMessage$.next("updated");
          this.getBooks(
            1,
            this.setBooksPerPage$.value,
            this.setSortBy$.value,
            this.setDirection$.value
          );
        },
        response => {
          this.errorGet$.next(response.error);
        }
      );
  }

  deleteBook(id: number) {
    this.http.delete(`http://localhost:8080/api/books/${id}`).subscribe(
      () => {
        this.setSuccessMessage$.next("deleted");
        this.getBooks(
          1,
          this.setBooksPerPage$.value,
          this.setSortBy$.value,
          this.setDirection$.value
        );
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  findBook(
    pageNumber: number,
    rowPerPage: number,
    sortBy: string,
    direction: string,
    value: string
  ) {
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("name", value.toString())
      .set("rowPerPage", rowPerPage.toString())
      .set("sortBy", sortBy.toString())
      .set("direction", direction.toString());
    return this.http
      .get(`http://localhost:8080/api/books`, { params })
      .subscribe(
        response => {
          this.booksChanged$.next(response);
        },
        response => {
          this.errorGet$.next(response.error);
        }
      );
  }
}
