import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  getPublishers() {
    return this.httpClient.get("http://localhost:8080/api/publishers/35");
  }
}
