import { Component, OnInit, Input } from "@angular/core";
import { Author } from "src/app/models/author.model";
import { AuthService } from "src/app/services/auth.service";
import { SortTitles } from "src/app/models/sort-titles.model";

@Component({
  selector: "app-authors-table",
  templateUrl: "./authors-table.component.html",
  styleUrls: ["./authors-table.component.css"]
})
export class AuthorsTableComponent implements OnInit {
  @Input() authors: Author[];
  @Input() direction: string;
  @Input() sortBy: string;
  @Input() set sortMode(sortMode: string) {
    this._sortMode = sortMode === null ? true : false;
  }

  private _sortMode: boolean = true;
  isLoggedIn: boolean;

  selectedAuthor: number;

  titles: SortTitles[] = [
    { title: "ID", sortBy: "id" },
    { title: "Author's name", sortBy: "firstName" },
    { title: "Author's surname", sortBy: "lastName" }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  selectAuthor(id: number): void {
    if (this.selectedAuthor === id) {
      this.selectedAuthor = -1;
    } else {
      this.selectedAuthor = id;
    }
  }
}
