import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _categoriesListSubj: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);


  constructor(private http:HttpClient) { 
  }

  getCategories$(): Observable<string[]>{
    return this._categoriesListSubj.asObservable();
  }

  loadCategories(): void {
    this.http.get<string[]>(`${environment.apiUrl}/products/categories`).pipe(
      tap(categories => this._categoriesListSubj.next(categories))
    ).subscribe()
  }

}
