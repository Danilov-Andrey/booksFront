import { Component, Input } from "@angular/core";
import { SortService } from "../../../services/sort.service";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.css"]
})
export class SortComponent {
  @Input() title: string;
  @Input() direction: string;
  @Input() sortBy: string;

  constructor(private sortService: SortService) {}

  onSortBy(sortBy: string): void {
    if (sortBy === this.sortBy) {
      if (this.direction === "ASC") {
        this.direction = "DESC";
      } else {
        this.direction = "ASC";
      }
    } else {
      this.sortBy = sortBy;
      this.direction = "ASC";
    }

    this.sortService.setSort$.emit({
      direction: this.direction,
      sortBy: this.sortBy
    });
  }
}
