import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { Publisher } from "src/app/models/publisher.model";

@Injectable({
  providedIn: "root"
})
export class PublishersService {
  publishersChanged$ = new Subject<any>();
  errorGet$ = new Subject<string>();
  setLoading$ = new Subject();
  setPublishersPerPage$ = new BehaviorSubject<number>(10);
  setSuccessMessage$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  getPublishers(
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
    this.http.get(`http://localhost:8080/api/publishers`, { params }).subscribe(
      response => {
        this.publishersChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  getPublisher(
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
    this.http.get(`http://localhost:8080/api/publishers`, { params }).subscribe(
      response => {
        this.publishersChanged$.next(response);
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  updatePublisher(rowPerPage: number, publisher: Publisher) {
    this.http
      .patch(`http://localhost:8080/api/publishers/${publisher.id}`, publisher)
      .subscribe(
        () => {
          this.setSuccessMessage$.next("updated");
          this.getPublishers(1, rowPerPage, "id", "ASC");
        },
        response => {
          this.errorGet$.next(response.error);
        }
      );
  }

  deletePublisher(id: number, rowPerPage: number) {
    this.http.delete(`http://localhost:8080/api/publishers/${id}`).subscribe(
      () => {
        this.setSuccessMessage$.next("deleted");
        this.getPublishers(1, rowPerPage, "id", "ASC");
      },
      response => {
        this.errorGet$.next(response.error);
      }
    );
  }

  savePublisher(publisher: Publisher) {
    return this.http.post("http://localhost:8080/api/publishers", publisher);
  }
}
