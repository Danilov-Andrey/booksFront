import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(
      "http://localhost:8080/api/books?pageNumber=1&rowPerPage=10"
    );
  }

  saveBook(newBook) {
    return this.http.post("http://localhost:8080/api/books", newBook);
  }

  getAllBooks(pageNumber: number, rowPerPage: number) {
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("rowPerPage", rowPerPage.toString());
    return this.http.get(`http://localhost:8080/api/books`, { params });
  }

  getBookByID(id: number) {
    return this.http.get(`http://localhost:8080/api/books/${id}`);
  }
}
