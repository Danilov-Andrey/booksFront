import { Injectable, EventEmitter } from "@angular/core";

interface SortInfo {
  direction: string;
  sortBy: string;
}

@Injectable({
  providedIn: "root"
})
export class SortService {
  setSort$ = new EventEmitter<SortInfo>();

  constructor() {}
}
