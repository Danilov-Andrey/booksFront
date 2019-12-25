import { Component, OnInit, Input } from "@angular/core";
import { Author } from "src/app/models/author.model";
import { AuthService } from "src/app/service/auth.service";

export interface Titles {
  title: string;
  sortBy: string;
}

@Component({
  selector: "app-authors-table",
  templateUrl: "./authors-table.component.html",
  styleUrls: ["./authors-table.component.css"]
})
export class AuthorsTableComponent implements OnInit {
  @Input() authors: Author[];
  @Input() direction: string;
  @Input() sortBy: string;
  @Input() set searchMode(searchMode: string) {
    this._searchMode = searchMode === null ? true : false;
  }
  private _searchMode: boolean = true;
  isLoggedIn: boolean;

  selectedAuthor: number;

  titles: Titles[] = [
    { title: "ID", sortBy: "id" },
    { title: "Author's name", sortBy: "firstName" },
    { title: "Author's surname", sortBy: "lastName" }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  selectAuthor(id: number) {
    if (this.selectedAuthor === id) {
      this.selectedAuthor = -1;
    } else {
      this.selectedAuthor = id;
    }
  }
}
