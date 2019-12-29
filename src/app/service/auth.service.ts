import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string) {
    const headers = new HttpHeaders({
      authorization: "Basic " + btoa(username + ":" + password)
    });

    return this.httpClient
      .get("http://localhost:8080/api/users/validateUser", { headers })
      .pipe(
        map(userData => {
          let authString = "Basic " + btoa(username + ":" + password);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("basicauth", authString);
          return userData;
        })
      );
  }

  registration(username: string, password: string) {
    return this.httpClient.post("http://localhost:8080/api/users", {
      username,
      password
    });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
