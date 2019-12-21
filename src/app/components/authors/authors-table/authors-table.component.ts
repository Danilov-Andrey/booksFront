import { Component, OnInit, Input } from "@angular/core";
import { Author } from "src/app/models/author.model";

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
    this._searchMode = searchMode === "" ? true : false;
  }

  private _searchMode: boolean = true;

  titles: Titles[] = [
    { title: "ID", sortBy: "id" },
    { title: "Author's name", sortBy: "firstName" },
    { title: "Author's surname", sortBy: "lastName" }
  ];

  constructor() {}

  ngOnInit() {}
}
