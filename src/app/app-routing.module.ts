import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./components/books/books.component";
import { PublishersComponent } from "./components/publishers/publishers.component";
import { AuthorsComponent } from "./components/authors/authors.component";
import { CopiesComponent } from "./components/copies/copies.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { BookCreateComponent } from "./components/books/book-create/book-create.component";
import { BookEditComponent } from "./components/books/book-edit/book-edit.component";
import { AuthorsCreateComponent } from "./components/authors/authors-create/authors-create.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "books",
    canActivate: [AuthGuardService],
    children: [
      { path: "", pathMatch: "full", component: BooksComponent },
      { path: "add", component: BookCreateComponent },
      { path: ":id", component: BookEditComponent }
    ]
  },
  { path: "publishers", component: PublishersComponent },
  {
    path: "authors",
    children: [
      { path: "", pathMatch: "full", component: AuthorsComponent },
      { path: "add", component: AuthorsCreateComponent }
    ]
  },
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
