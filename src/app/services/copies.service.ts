import { Injectable } from "@angular/core";
import { Copies } from "src/app/models/copies.model";
import { Subject, BehaviorSubject } from "rxjs";
import { HttpParams, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CopiesService {
  copiesChanged$ = new Subject<any>();
  errorGet$ = new Subject<string>();
  setLoading$ = new Subject();
  setCopiesPerPage$ = new BehaviorSubject<number>(10);
  setSortBy$ = new BehaviorSubject<string>("id");
  setDirection$ = new BehaviorSubject<string>("ASC");
  setSuccessMessage$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  getCopies(
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
    this.http.get(`http://localhost:8080/api/copies`, { params }).subscribe(
      response => {
        this.copiesChanged$.next(response);
      },
      (response: { error: string }) => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getCopiesByid(id: number): void {
    this.http.get(`http://localhost:8080/api/copies/${id}`).subscribe(
      response => {
        this.copiesChanged$.next({
          content: [{ ...response }],
          totalPages: 1,
          totalElements: 1,
          pageable: { pageNumber: 0 }
        });
      },
      (response: { error: string }) => {
        this.errorGet$.next(response.error);
      }
    );
  }

  updateCopies(copies: Copies): void {
    this.setLoading$.next();
    this.http
      .put(`http://localhost:8080/api/copies/${copies.id}`, copies)
      .subscribe(
        () => {
          this.setSuccessMessage$.next("updated");
          this.getCopies(
            1,
            this.setCopiesPerPage$.value,
            this.setSortBy$.value,
            this.setDirection$.value
          );
        },
        (response: { error: string }) => {
          this.errorGet$.next(response.error);
        }
      );
  }
}
