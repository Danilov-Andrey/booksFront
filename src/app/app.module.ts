import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XhrInterceptor } from "./interceptors/XhrInterceptor";
import { MainNavComponent } from "./components/main-nav/main-nav.component";
import { BooksComponent } from "./components/books/books.component";
import { AuthorsComponent } from "./components/authors/authors.component";
import { PublishersComponent } from "./components/publishers/publishers.component";
import { CopiesComponent } from "./components/copies/copies.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { MatInputModule } from "@angular/material/input";
import { BookCreateComponent } from "./components/books/book-create/book-create.component";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Spinner } from "./components/shared/spinner/spinner.component";
import { Paginator } from "./components/shared/paginator/paginator.component";
import { BookEditComponent } from "./components/books/book-edit/book-edit.component";
import { FormErrorComponent } from "./components/shared/form-errors/form-errors.component";
import { SearchComponent } from "./components/shared/search/search.component";
import { ErrorComponent } from "./components/shared/error/error.component";
import { BookTableComponent } from "./components/books/book-table/book-table.component";
import { SortComponent } from "./components/shared/sort/sort.component";
import { SuccessfulMessageComponent } from "./components/shared/successful-message/successful-message.component";
import { AuthorsTableComponent } from "./components/authors/authors-table/authors-table.component";
import { AuthorsEditComponent } from "./components/authors/authors-edit/authors-edit.component";
import { SigninButtonComponent } from "./components/shared/signin-button/signin-button.component";
import { AuthorsCreateComponent } from "./components/authors/authors-create/authors-create.component";
import { PublishersCreateComponent } from "./components/publishers/publishers-create/publishers-create.component";
import { PublishersTableComponent } from "./components/publishers/publishers-table/publishers-table.component";
import { PublishersEditComponent } from "./components/publishers/publishers-edit/publishers-edit.component";
import { CopiesTableComponent } from "./components/copies/copies-table/copies-table.component";
import { CopiesEditComponent } from "./components/copies/copies-edit/copies-edit.component";
import { AuthorsAddBookComponent } from "./components/authors/authors-add-book/authors-add-book.component";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    BooksComponent,
    AuthorsComponent,
    PublishersComponent,
    CopiesComponent,
    LoginComponent,
    LogoutComponent,
    Spinner,
    Paginator,
    BookCreateComponent,
    FormErrorComponent,
    BookEditComponent,
    SearchComponent,
    ErrorComponent,
    BookTableComponent,
    SortComponent,
    SuccessfulMessageComponent,
    AuthorsTableComponent,
    AuthorsEditComponent,
    SigninButtonComponent,
    AuthorsCreateComponent,
    PublishersCreateComponent,
    PublishersTableComponent,
    PublishersEditComponent,
    CopiesTableComponent,
    CopiesEditComponent,
    AuthorsAddBookComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
