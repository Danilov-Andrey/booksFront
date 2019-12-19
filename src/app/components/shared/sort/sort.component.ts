import { Component, OnInit, Input } from "@angular/core";
import { SortService } from "./sort.service";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.css"]
})
export class SortComponent implements OnInit {
  @Input() title: string;
  @Input() direction: string;
  @Input() sortBy: string;

  constructor(private sortService: SortService) {}

  ngOnInit() {}

  onSortBy(title: string) {
    this.sortService.setSort$.emit(title);
  }
}
