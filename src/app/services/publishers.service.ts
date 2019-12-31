import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { Publisher } from "src/app/models/publisher.model";

@Injectable({
  providedIn: "root"
})
export class PublishersService {
  publishersChanged$ = new Subject<any>();
  errorGet$ = new Subject<string>();
  setLoading$ = new Subject();
  setSuccessMessage$ = new Subject<string>();
  setPublishersPerPage$ = new BehaviorSubject<number>(10);
  setSortBy$ = new BehaviorSubject<string>("id");
  setDirection$ = new BehaviorSubject<string>("ASC");

  constructor(private http: HttpClient) {}

  getPublishers(
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
    this.http.get(`/api/publishers`, { params }).subscribe(
      response => {
        this.publishersChanged$.next(response);
      },
      (response: { error: string }) => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getPublisher(name: string): void {
    const params = new HttpParams().set("name", name.toString());
    this.http
      .get<Publisher>(`/api/publishers`, { params })
      .subscribe(
        response => {
          this.publishersChanged$.next({
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

  updatePublisher(publisher: Publisher): void {
    this.http.put(`/api/publishers/${publisher.id}`, publisher).subscribe(
      () => {
        this.setSuccessMessage$.next("updated");
        this.getPublishers(
          1,
          this.setPublishersPerPage$.value,
          this.setSortBy$.value,
          this.setDirection$.value
        );
      },
      (response: { error: string }) => {
        this.errorGet$.next(response.error);
      }
    );
  }

  deletePublisher(id: number): void {
    this.http.delete(`/api/publishers/${id}`).subscribe(
      () => {
        this.setSuccessMessage$.next("deleted");
        this.getPublishers(
          1,
          this.setPublishersPerPage$.value,
          this.setSortBy$.value,
          this.setDirection$.value
        );
      },
      (response: { error: string }) => {
        this.errorGet$.next(response.error);
      }
    );
  }

  savePublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>("/api/publishers", publisher);
  }

  getPublisherById(id: number): void {
    this.http.get<Publisher>(`/api/publishers/${id}`).subscribe(
      response => {
        this.publishersChanged$.next({
          content: [{ ...response }],
          totalPages: 1,
          totalElements: 1,
          pageable: {
            pageNumber: 0
          }
        });
      },
      (response: { error: string }) => {
        this.errorGet$.next(response.error);
      }
    );
  }
}
