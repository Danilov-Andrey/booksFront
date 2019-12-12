import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

class User {
  username: string;
  password: string;
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username, password) {
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

  registration(username, password) {
    const user = new User(username, password);
    return this.httpClient.post("http://localhost:8080/api/users", user);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
