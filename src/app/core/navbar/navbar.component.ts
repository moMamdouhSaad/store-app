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
import { AdminOnlyDirective } from 'src/app/shared/directives/adminOnly.directive';
import { UserCredential } from 'src/app/enums/User.credentials.enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone:true,
  imports:[MatToolbarModule,MatIconModule,CommonModule,FlexLayoutModule,MatButtonModule,CategoriesListComponent,AdminOnlyDirective]
})
export class NavbarComponent implements OnInit {
  categoriesList$!:Observable<string[]>;
  isAdmin = false;
  username!:string;

  constructor(private authService: AuthService, private router: Router, private categoriesService: CategoriesService,) { }

  ngOnInit(): void {
    this.categoriesList$ = this.categoriesService.getCategories$();
    this.username = this.authService.getCurrentUser()?.username as string
    if(this.authService.getCurrentUser()?.role == UserCredential.ADMIN){
      console.log(this.authService.getCurrentUser()?.role)
      this.isAdmin = true
    }

  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
