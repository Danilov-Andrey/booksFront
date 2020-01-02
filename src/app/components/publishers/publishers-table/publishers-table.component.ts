import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Publisher } from "src/app/models/publisher.model";
import { SortTitles } from "src/app/models/sort-titles.model";

@Component({
  selector: "app-publishers-table",
  templateUrl: "./publishers-table.component.html",
  styleUrls: ["./publishers-table.component.css"]
})
export class PublishersTableComponent implements OnInit {
  @Input() publishers: Publisher[];
  @Input() direction: string;
  @Input() sortBy: string;
  @Input() set sortMode(sortMode: string) {
    this._sortMode = sortMode === null ? true : false;
  }
  private _sortMode: boolean = true;
  isLoggedIn: boolean;

  selectedPublisher: number;

  titles: SortTitles[] = [
    { title: "ID", sortBy: "id" },
    { title: "Publisher's name", sortBy: "name" }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  selectPublisher(id: number): void {
    if (this.selectedPublisher === id) {
      this.selectedPublisher = -1;
    } else {
      this.selectedPublisher = id;
    }
  }
}
