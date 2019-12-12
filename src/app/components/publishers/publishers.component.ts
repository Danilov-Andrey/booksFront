import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-publishers",
  templateUrl: "./publishers.component.html",
  styleUrls: ["./publishers.component.css"]
})
export class PublishersComponent implements OnInit {
  publisherName: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  sendPublisher() {
    this.http
      .post("http://localhost:8080/api/publishers", {
        name: this.publisherName
      })
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
      );
  }
}
