import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UpdateBook } from "src/app/models/update-book.model";
import { Subject } from "rxjs";
import { Book } from "src/app/models/book.model";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  booksChanges = new Subject<Book[]>();

  constructor(private http: HttpClient) {}

  saveBook(newBook) {
    return this.http.post("http://localhost:8080/api/books", newBook);
  }

  getAllBooks(
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
    return this.http.get(`http://localhost:8080/api/books`, { params });
  }

  getBookByID(id: number) {
    return this.http.get(`http://localhost:8080/api/books/${id}`);
  }

  updateBook(id: number, updateBook: UpdateBook) {
    return this.http.patch(`http://localhost:8080/api/books/${id}`, updateBook);
  }

  deleteBook(id: number) {
    return this.http.delete(`http://localhost:8080/api/books/${id}`).pipe(
      switchMap(() => this.getAllBooks(1, 1, "id", "ASC")),
      map(data => {
        this.booksChanges.next(data["data"]);
        return data;
      })
    );
  }
}
