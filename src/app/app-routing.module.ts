import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./components/books/books.component";
import { PublishersComponent } from "./components/publishers/publishers.component";
import { AuthorsComponent } from "./components/authors/authors.component";
import { CopiesComponent } from "./components/copies/copies.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { BookCreatorComponent } from "./components/books/book-creator/book-creator.component";
import { BookEditComponent } from "./components/books/book-edit/book-edit.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "books",
    canActivate: [AuthGuardService],
    children: [
      { path: "", component: BooksComponent },
      { path: "add", component: BookCreatorComponent },
      { path: ":id", component: BookEditComponent }
    ]
  },
  { path: "publishers", component: PublishersComponent },
  { path: "authors", component: AuthorsComponent },
  { path: "copies", component: CopiesComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "**", redirectTo: "books" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
