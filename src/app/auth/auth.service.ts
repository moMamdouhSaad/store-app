// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'testas';

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  login(username: string, role: string): void {
    const user = { username, role };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): { username: string; role: string } | null {
    try {
      const userString = localStorage.getItem(this.USER_KEY);
      if (userString) {
        return JSON.parse(userString);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error parsing user data from local storage:', error);
      return null;
    }
  }

  
}
