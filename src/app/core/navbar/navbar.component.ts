import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CategoriesListComponent } from 'src/app/shared/components/categories-list/categories-list.component';
import { filter, map, Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { AdminOnlyDirective } from 'src/app/shared/directives/adminOnly.directive';
import { UserCredential } from 'src/app/enums/User.credentials.enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule, FlexLayoutModule, MatButtonModule, CategoriesListComponent, AdminOnlyDirective]
})
export class NavbarComponent implements OnInit {
  categoriesList$!: Observable<string[]>;
  isAdmin = false;
  username!: string;
  isUserView!: boolean


  constructor(private authService: AuthService, private router: Router,

    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesList$ = this.categoriesService.getCategories$();



    this.authService.getCurrentUser$().subscribe(user => {
      if (user) {
        setTimeout(() => {
          console.log(this.getCurrentUrl())
          this.performNavbarLogic(this.getCurrentUrl());

        }, 300);

        console.log(user)
        this.username = user.username
        if (user.role === UserCredential.ADMIN) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false
        }
      }
    })




  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    location.reload();


  }



  switchView(): void {
    if (this.isUserView) {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/products']);
    }
    this.isUserView = !this.isUserView
  }

  private performNavbarLogic(currentUrl: string) {
    // Check if the desired string exists in the current URL
    if (currentUrl.includes('dashboard')) {
      // Do something if the string exists in the URL
      this.isUserView = false
    } else {
      // Do something else if the string does not exist in the URL
      this.isUserView = true
    }

  }

  private getCurrentUrl(): string {

    return this.router.url;
  }


}
