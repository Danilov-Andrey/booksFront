import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UpdateBook } from "src/app/models/update-book.model";
import { Subject, of } from "rxjs";
import { Book } from "src/app/models/book.model";
import { switchMap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  booksChanged$ = new Subject<any>();
  errorGet$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  saveBook(newBook) {
    return this.http.post("http://localhost:8080/api/books", newBook);
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
      err => {
        this.errorGet$.next(err);
      }
    );
  }

  getBookByID(id: number) {
    return this.http.get(`http://localhost:8080/api/books/${id}`);
  }

  updateBook(id: number, updateBook: UpdateBook) {
    return this.http.patch(`http://localhost:8080/api/books/${id}`, updateBook);
  }

  deleteBook(id: number) {
    this.http
      .delete(`http://localhost:8080/api/books/${id}`)
      .pipe(map(() => this.getBooks(1, 1, "id", "ASC")));
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
