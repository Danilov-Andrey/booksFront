import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { Author } from "src/app/models/author.model";
import { Book } from "src/app/models/book.model";

@Injectable({
  providedIn: "root"
})
export class AuthorsService {
  authorsChanged$ = new Subject<any>();
  errorGet$ = new Subject<string>();
  setLoading$ = new Subject();
  setAuthorsPerPage$ = new BehaviorSubject<number>(10);
  setSortBy$ = new BehaviorSubject<string>("id");
  setDirection$ = new BehaviorSubject<string>("ASC");
  setSuccessMessage$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  getAuthors(
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
    this.http.get(`/api/authors`, { params }).subscribe(
      response => {
        this.authorsChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getAuthor(
    pageNumber: number,
    rowPerPage: number,
    sortBy: string,
    direction: string,
    name: string
  ) {
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("rowPerPage", rowPerPage.toString())
      .set("sortBy", sortBy.toString())
      .set("direction", direction.toString())
      .set("name", name.toString());
    this.http.get(`/api/authors`, { params }).subscribe(
      response => {
        this.authorsChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  updateAuthor(author: Author) {
    this.setLoading$.next();
    this.http.patch(`/api/authors/${author.id}`, author).subscribe(
      () => {
        this.setSuccessMessage$.next("updated");
        this.getAuthors(
          1,
          this.setAuthorsPerPage$.value,
          this.setSortBy$.value,
          this.setDirection$.value
        );
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  deleteAuthor(id: number) {
    this.setLoading$.next();
    this.http.delete(`/api/authors/${id}`).subscribe(
      () => {
        this.setSuccessMessage$.next("deleted");
        this.getAuthors(
          1,
          this.setAuthorsPerPage$.value,
          this.setSortBy$.value,
          this.setDirection$.value
        );
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  saveAuthor(author: Author) {
    this.http.post("/api/authors", author).subscribe(
      () => {
        this.setSuccessMessage$.next("saved");
      },
      response => {
        this.errorGet$.next(response.message);
      }
    );
  }

  getAuthorById(id: number) {
    this.http.get(`/api/authors/${id}`).subscribe(
      response => {
        this.authorsChanged$.next({
          content: [{ ...response }],
          totalPages: 1,
          totalElements: 1,
          pageable: {
            pageNumber: 0
          }
        });
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  addNewBook(id: number, book: Book) {
    this.http.post(`/api/authors/${id}`, book).subscribe(
      () => {
        this.setSuccessMessage$.next("saved");
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }
}
