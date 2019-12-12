import { Injectable } from "@angular/core";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      sessionStorage.getItem("username") &&
      sessionStorage.getItem("basicauth")
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem("basicauth")
        }
      });
    }

    return next.handle(req);
  }
}
