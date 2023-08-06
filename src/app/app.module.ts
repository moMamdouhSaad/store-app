import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthGuard } from './guards/auth.guard';
import { LoginModule } from './auth/login/login.module';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsTableComponent } from './shared/components/products-table/products-table.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LoginModule,
    HttpClientModule,

    // Components
    NavbarComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  exports: [
  ],
})
export class AppModule { }
