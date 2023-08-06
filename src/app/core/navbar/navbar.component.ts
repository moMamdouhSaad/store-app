import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CategoriesListComponent } from 'src/app/shared/components/categories-list/categories-list.component';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone:true,
  imports:[MatToolbarModule,MatIconModule,CommonModule,FlexLayoutModule,CategoriesListComponent]
})
export class NavbarComponent implements OnInit {
  categoriesList$!:Observable<string[]>;

  constructor(private authService: AuthService, private router: Router,private categoriesService:CategoriesService) {}

  ngOnInit(): void {
    this.categoriesList$ = this.categoriesService.getCategories$();

  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
