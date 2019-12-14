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
import { Spinner } from "./components/ui/spinner/spinner.component";
import { Paginator } from "./components/ui/paginator/paginator.component";
import { BookEditComponent } from "./components/books/book-edit/book-edit.component";
import { FormErrorComponent } from "./components/ui/form-errors/form-errors.component";

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
    BookEditComponent
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
