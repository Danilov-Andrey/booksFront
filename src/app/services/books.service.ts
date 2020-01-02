import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UpdateBook } from "src/app/models/update-book.model";
import { Subject, BehaviorSubject, Observable, Subscription } from "rxjs";
import { NewBook } from "../models/new-book.model";

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

  saveBook(newBook: NewBook): void {
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
  ): void {
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("rowPerPage", rowPerPage.toString())
      .set("sortBy", sortBy.toString())
      .set("direction", direction.toString());
    this.http.get(`/api/books`, { params }).subscribe(
      response => {
        this.booksChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getBookByID(id: number): Observable<any> {
    return this.http.get(`/api/books/${id}`);
  }

  updateBook(id: number, updateBook: UpdateBook): void {
    this.http.patch(`/api/books/${id}`, updateBook).subscribe(
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

  deleteBook(id: number): void {
    this.http.delete(`/api/books/${id}`).subscribe(
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
  ): Subscription {
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("name", value.toString())
      .set("rowPerPage", rowPerPage.toString())
      .set("sortBy", sortBy.toString())
      .set("direction", direction.toString());
    return this.http.get(`/api/books`, { params }).subscribe(
      response => {
        this.booksChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getAuthorBooks(
    id: number,
    pageNumber: number,
    rowPerPage: number,
    sortBy: string,
    direction: string
  ): void {
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("rowPerPage", rowPerPage.toString())
      .set("sortBy", sortBy.toString())
      .set("direction", direction.toString());
    this.http.get(`/api/authors/${id}/books`, { params }).subscribe(
      response => {
        this.booksChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getPublisherBooks(
    id: number,
    pageNumber: number,
    rowPerPage: number,
    sortBy: string,
    direction: string
  ): void {
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("rowPerPage", rowPerPage.toString())
      .set("sortBy", sortBy.toString())
      .set("direction", direction.toString());
    this.http.get(`/api/publishers/${id}/books`, { params }).subscribe(
      response => {
        this.booksChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getBookByCopiesId(id: number): void {
    this.http.get(`/api/copies/${id}/books`).subscribe(
      response => {
        this.booksChanged$.next({
          content: [{ ...response }],
          totalPages: 1,
          totalElements: 1,
          pageable: { pageNumber: 0 }
        });
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }
}
