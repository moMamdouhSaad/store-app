// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'user';
  private _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);


  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  login(username: string, role: string): void {
    const user = { username, role };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._userSubject.next(user as User)
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUserFromLocalStorage(): { username: string; role: string } | null {
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

  getCurrentUser$(): Observable<User | null> {
    if(this.isLoggedIn()){
      const userString = JSON.parse(localStorage.getItem(this.USER_KEY) as string);
      this._userSubject.next(userString as User)
    }
    return this._userSubject.asObservable()
  }

  
}
