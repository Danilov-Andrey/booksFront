import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { Author } from "src/app/models/author.model";

@Injectable({
  providedIn: "root"
})
export class AuthorsService {
  authorsChanged$ = new Subject<any>();
  errorGet$ = new Subject<string>();
  setLoading$ = new Subject();
  setAuthorsPerPage$ = new BehaviorSubject<number>(10);
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
    this.http.get(`http://localhost:8080/api/authors`, { params }).subscribe(
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
    this.http.get(`http://localhost:8080/api/authors`, { params }).subscribe(
      response => {
        this.authorsChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  updateAuthor(rowPerPage: number, author: Author) {
    this.http
      .patch(`http://localhost:8080/api/authors/${author.id}`, author)
      .subscribe(
        () => {
          this.setSuccessMessage$.next("updated");
          this.getAuthors(1, rowPerPage, "id", "ASC");
        },
        response => {
          this.errorGet$.next(response.error);
        }
      );
  }

  deleteAuthor(id: number, rowPerPage: number) {
    this.http.delete(`http://localhost:8080/api/authors/${id}`).subscribe(
      () => {
        this.setSuccessMessage$.next("deleted");
        this.getAuthors(1, rowPerPage, "id", "ASC");
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }
}
