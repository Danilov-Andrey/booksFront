import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AppService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AppService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) return true;

    this.router.navigate(["/login"]);

    return false;
  }
}
