import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./components/books/books.component";
import { PublishersComponent } from "./components/publishers/publishers.component";
import { AuthorsComponent } from "./components/authors/authors.component";
import { CopiesComponent } from "./components/copies/copies.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { BookCreateComponent } from "./components/books/book-create/book-create.component";
import { AuthorsCreateComponent } from "./components/authors/authors-create/authors-create.component";
import { PublishersCreateComponent } from "./components/publishers/publishers-create/publishers-create.component";
import { AuthorsAddBookComponent } from "./components/authors/authors-add-book/authors-add-book.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "books",
    children: [
      { path: "", pathMatch: "full", component: BooksComponent },
      { path: "add", component: BookCreateComponent }
    ]
  },
  {
    path: "publishers",
    children: [
      { path: "", pathMatch: "full", component: PublishersComponent },
      { path: "add", component: PublishersCreateComponent }
    ]
  },
  {
    path: "authors",
    children: [
      { path: "", pathMatch: "full", component: AuthorsComponent },
      { path: "add", component: AuthorsCreateComponent },
      { path: ":id/new-book", component: AuthorsAddBookComponent }
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
