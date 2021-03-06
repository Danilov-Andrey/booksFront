import { Component, OnInit, Input } from "@angular/core";
import { Copies } from "src/app/models/copies.model";
import { AuthService } from "src/app/services/auth.service";

export interface Titles {
  title: string;
  sortBy: string;
}

@Component({
  selector: "app-copies-table",
  templateUrl: "./copies-table.component.html",
  styleUrls: ["./copies-table.component.css"]
})
export class CopiesTableComponent implements OnInit {
  @Input() copies: Copies[];
  @Input() direction: string;
  @Input() sortBy: string;
  @Input() set sortMode(sortMode: string) {
    this._sortMode = sortMode === null ? true : false;
  }
  private _sortMode: boolean = true;
  isLoggedIn: boolean;

  selectedCopies: number;

  titles: Titles[] = [
    { title: "ID", sortBy: "id" },
    { title: "Count", sortBy: "count" },
    { title: "Rate", sortBy: "rate" }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  selectCopies(id: number): void {
    if (this.selectedCopies === id) {
      this.selectedCopies = -1;
    } else {
      this.selectedCopies = id;
    }
  }
}
