import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      // If the user is logged in, redirect to the appropriate view (user or admin)
      const role = this.authService.getCurrentUserFromLocalStorage()?.role;
      if (role === 'user') {
        this.router.navigate(['/user']);
      } else if (role === 'admin') {
        this.router.navigate(['/admin']);
      }
      return false;
    }
    return true;
  }
}
