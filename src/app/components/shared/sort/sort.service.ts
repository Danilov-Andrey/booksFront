import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SortService {
  setSort = new EventEmitter<string>();

  constructor() {}
}
