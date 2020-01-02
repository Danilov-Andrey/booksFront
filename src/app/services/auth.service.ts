import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: "Basic " + btoa(username + ":" + password)
    });

    return this.httpClient.get("/api/users/validate-user", { headers }).pipe(
      map(userData => {
        let authString = "Basic " + btoa(username + ":" + password);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("basicauth", authString);
        return userData;
      })
    );
  }

  registration(username: string, password: string): Observable<any> {
    return this.httpClient.post("/api/users", {
      username,
      password
    });
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem("username");
  }
}
