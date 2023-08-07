import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment'
import { Product } from '../models/products';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _addedProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private deleteProductSubject = new Subject<number>();
  private _selectedCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _minPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _maxPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _lastID: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  getProducts$(): Observable<Product[]> {
    return this._productsSubject.asObservable();
  }

  loadProducts(category?: string): void {
    console.log(category)
    this._productsSubject.next([]);


     if (!category) {
      this._selectedCategory.next('ALL')
      this.router.navigate(['/products']);
    }


    else {
      this.router.navigate(['/products'], { queryParams: { category }, queryParamsHandling: 'merge' });
      this._selectedCategory.next(category)

    }  


    this.http.get<Product[]>(`${environment.apiUrl}/products${category ? '/category/' + category : ''}`).pipe(
      delay(199), // to show skeleton loader 
      tap(products => {
        this._productsSubject.next(products.reverse());
        const min = Math.min(...products.map(item => item.price));
        const max = Math.max(...products.map(item => item.price));
        const lastID = Math.max(...products.map(item => item.id as number));
        this._minPrice.next(min)
        this._maxPrice.next(max)
        this._lastID.next(lastID)
      },

      )
    ).subscribe()
  }


  addNewProduct(product: Product): void {
    const id = this._lastID.value + 1;
    const addedProduct: Product = {
      id,
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image,
      rating: { count: '0', rate: '0' },
    };
    const currentProducts = this._productsSubject.value;
    const updatedProducts = [addedProduct, ...currentProducts];

    this._productsSubject.next(updatedProducts);

    // Update the last ID
    this._lastID.next(id);
  }

  getSelectedCategory$():Observable<string>{
    return this._selectedCategory.asObservable()
  }

  updateProduct(product: Product): void {
    console.log(product)
    // Get the current list of products
    const currentProducts = this._productsSubject.value;

    // Find the index of the product to be updated in the array
    const index = currentProducts.findIndex((p) => p.id === product.id);

    // If the product is found, update its properties and replace it in the array
    if (index !== -1) {
      const updatedProduct: Product = {
        ...currentProducts[index],
        title: product.title,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
      };

      // Create a new array with the updated product
      const updatedProducts = [
        ...currentProducts.slice(0, index),
        updatedProduct,
        ...currentProducts.slice(index + 1),
      ];

      // Update the products list in the BehaviorSubject
      this._productsSubject.next(updatedProducts);
    }
  }

  deleteProductWithId(id: number): void {
    // Get the current list of products
    const currentProducts = this._productsSubject.value;

    // Filter out the product with the given ID
    const updatedProducts = currentProducts.filter((product) => product.id !== id);

    // Update the products list in _productsSubject
    this._productsSubject.next(updatedProducts);

    // Emit the delete event
    this.deleteProductSubject.next(id);
  }


  getMinPrice$(): Observable<number> {
    return this._minPrice.asObservable()
  }

  getMaxPrice$(): Observable<number> {
    return this._maxPrice.asObservable();
  }

  getLastId$(): Observable<number> {
    return this._lastID.asObservable();
  }






}
