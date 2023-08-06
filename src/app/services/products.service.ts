import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import{environment} from '../../environments/environment'
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _minPrice:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private _maxPrice:BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor(private http:HttpClient) { 
  }

  getProducts$():Observable<Product[]>{
    return this._productsSubject.asObservable();

  }

  loadProducts(category?: string): void {
    this.http.get<Product[]>(`${environment.apiUrl}/products${category ? '/category/' + category : ''}`).pipe(
      tap(products => {
        this._productsSubject.next(products);
        const min = Math.min(...products.map(item => item.price));
        const max = Math.max(...products.map(item => item.price));
        this._minPrice.next(min)
        this._maxPrice.next(max)      
      },
      
      )
    ).subscribe()
  }

  getMinPrice$():Observable<number>{
    return this._minPrice.asObservable()
  }
  
  getMaxPrice$():Observable<number>{
    return this._maxPrice.asObservable()

  }


}
