import { Component, OnInit } from "@angular/core";
import { PublishersService } from "../../services/publishers.service";
import { SortService } from "../shared/sort/sort.service";
import { Unsubscribable } from "rxjs";
import { Publisher } from "src/app/models/publisher.model";
import { ActivatedRoute } from "@angular/router";

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
  route$: Unsubscribable;

  publishers: Publisher[];
  countItems: number = 10;
  currentPage: number = 1;
  totalPages: number;
  direction: string = "ASC";
  sortBy: string = "id";
  searchPublisherName: string;
  totalPublishers: number;
  queryParam: string;
  queryParamId: number;

  isLoading: boolean = true;
  isError: boolean = false;
  isComplete: boolean = false;
  errorMessage: string;
  successMessage: string;
  successMessageTimer: number;

  constructor(
    private publishersService: PublishersService,
    private sortService: SortService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route$ = this.route.params.subscribe(params => {
      if (params.hasOwnProperty("id")) {
        this.queryParam = "id";
        this.queryParamId = params["id"];
      } else {
        this.queryParam = null;
        this.queryParamId = null;
      }
      this.getPublishers();
    });

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
        this.publishersService.setDirection$.next(direction);
        this.sortBy = sortBy;
        this.publishersService.setSortBy$.next(sortBy);
        this.currentPage = 1;
        this.callGetMethod();
      }
    );

    this.setSuccessMessage$ = this.publishersService.setSuccessMessage$.subscribe(
      message => {
        clearTimeout(this.successMessageTimer);
        this.searchPublisherName = null;
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
  }

  ngOnDestroy(): void {
    this.publishersChanged$.unsubscribe();
    this.errorGet$.unsubscribe();
    this.sortBy$.unsubscribe();
    this.isLoading$.unsubscribe();
    this.setSuccessMessage$.unsubscribe();
    this.route$.unsubscribe();
    clearTimeout(this.successMessageTimer);
  }

  getPublishers(): void {
    this.isLoading = true;

    switch (this.queryParam) {
      case "id":
        this.publishersService.getPublisherById(this.queryParamId);
        break;

      default:
        this.searchPublisherName = null;
        this.publishersService.getPublishers(
          this.currentPage,
          this.countItems,
          this.sortBy,
          this.direction
        );
    }
  }

  getPublisher(): void {
    this.isLoading = true;
    this.publishersService.getPublisher(this.searchPublisherName);
  }

  setPaginationData(paginatorInfo: {
    currentPage: number;
    countItems: number;
  }): void {
    this.currentPage = paginatorInfo.currentPage;
    this.countItems = paginatorInfo.countItems;
    this.publishersService.setPublishersPerPage$.next(this.countItems);
    this.callGetMethod();
  }

  callGetMethod(): void {
    this.isLoading = true;
    this.searchPublisherName === null
      ? this.getPublishers()
      : this.getPublisher();
  }

  returnInitialData(): void {
    this.currentPage = 1;
    this.searchPublisherName = null;
    this.getPublishers();
  }

  setLoading(): void {
    this.isLoading = true;
  }

  setSearchMode(name: string): void {
    this.searchPublisherName = name;
    this.currentPage = 1;
    this.getPublisher();
  }
}
