// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserCredential } from '../enums/User.credentials.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = next.data['role'];
    const currentUser = this.authService.getCurrentUserFromLocalStorage();

    if (currentUser && (currentUser.role === expectedRole || currentUser.role === UserCredential.ADMIN)) {
      return true; 
    } else {
      // this.router.navigate(['/unauthorized']); 
      return false;
    }
  }
}
