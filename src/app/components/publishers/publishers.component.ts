import { Component, OnInit } from "@angular/core";
import { PublishersService } from "./publishers.service";
import { SortService } from "../shared/sort/sort.service";
import { Unsubscribable } from "rxjs";
import { Publisher } from "src/app/models/publisher.model";

@Component({
  selector: "app-publishers",
  templateUrl: "./publishers.component.html",
  styleUrls: ["./publishers.component.css"]
})
export class PublishersComponent implements OnInit {
  publishersChanged$: Unsubscribable;
  errorGet$: Unsubscribable;
  sortBy$: Unsubscribable;
  isLoading$: Unsubscribable;
  setSuccessMessage$: Unsubscribable;

  publishers: Publisher[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  direction: string = "ASC";
  sortBy: string = "id";
  searchPublisherName: string = null;
  totalPublishers: number;

  isLoading: boolean = true;
  isError: boolean = false;
  isComplete: boolean = false;
  errorMessage: string;
  successMessage: string;
  successMessageTimer: number;

  constructor(
    private publishersService: PublishersService,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.publishersChanged$ = this.publishersService.publishersChanged$.subscribe(
      ({ content, totalPages, totalElements, pageable }) => {
        this.currentPage = pageable.pageNumber + 1;
        this.publishers = content;
        this.totalPages = totalPages;
        this.totalPublishers = totalElements;
        this.isError = false;
        this.isLoading = false;
        this.errorMessage = null;
      }
    );

    this.errorGet$ = this.publishersService.errorGet$.subscribe(error => {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = error;
    });

    this.sortBy$ = this.sortService.setSort$.subscribe(
      ({ direction, sortBy }) => {
        this.direction = direction;
        this.sortBy = sortBy;
        this.currentPage = 1;
        this.callGetMethod();
      }
    );

    this.setSuccessMessage$ = this.publishersService.setSuccessMessage$.subscribe(
      message => {
        clearTimeout(this.successMessageTimer);

        this.isComplete = true;
        this.successMessage = message;
        this.successMessageTimer = window.setTimeout(() => {
          this.isComplete = false;
          this.successMessage = null;
        }, 5000);
      }
    );

    this.isLoading$ = this.publishersService.setLoading$.subscribe(() => {
      this.isLoading = true;
    });

    this.getPublishers();
  }

  ngOnDestroy() {
    this.publishersChanged$.unsubscribe();
    this.errorGet$.unsubscribe();
    this.sortBy$.unsubscribe();
    this.isLoading$.unsubscribe();
    this.setSuccessMessage$.unsubscribe();
    clearTimeout(this.successMessageTimer);
  }

  getPublishers() {
    this.isLoading = true;
    this.searchPublisherName = null;
    this.publishersService.getPublishers(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction
    );
  }

  getPublisher() {
    this.isLoading = true;
    this.publishersService.getPublisher(
      this.currentPage,
      this.countItems,
      this.sortBy,
      this.direction,
      this.searchPublisherName
    );
  }

  setPaginationData(paginatorInfo: {
    currentPage: number;
    countItems: number;
  }) {
    this.currentPage = paginatorInfo.currentPage;
    this.countItems = paginatorInfo.countItems;
    this.publishersService.setPublishersPerPage$.next(this.countItems);
    this.callGetMethod();
  }

  callGetMethod() {
    this.isLoading = true;
    this.searchPublisherName === null
      ? this.getPublishers()
      : this.getPublisher();
  }

  setInitialValues() {
    this.currentPage = 1;
    this.countItems = 10;
    this.sortBy = "id";
    this.direction = "ASC";
  }

  returnInitialData() {
    this.setInitialValues();
    this.getPublishers();
  }

  setLoading() {
    this.isLoading = true;
  }

  setSearchMode(name: string) {
    this.searchPublisherName = name;
    this.setInitialValues();
    this.getPublisher();
  }
}
