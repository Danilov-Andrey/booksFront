import { Component, ChangeDetectorRef, OnDestroy, OnInit } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"]
})
export class MainNavComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  openMenu: string;

  onOpenMenu(menu: string) {
    this.openMenu = menu;
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private appService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
