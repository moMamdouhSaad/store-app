import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { ProductCardComponent } from 'src/app/auth/shared/components/product-card/product-card.component';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import {MatSliderModule} from '@angular/material/slider';
import { FilterComponent } from 'src/app/auth/shared/components/filter/filter.component';
import { CategoriesService } from 'src/app/services/categories.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './products-user-view.component.html',
  styleUrls: ['./products-user-view.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ProductCardComponent,FlexLayoutModule,MatSliderModule,FilterComponent,MatCheckboxModule]
})
export class ProductsUserViewComponent implements OnInit {
  products$!:Observable<Product[]>
  categories$!:Observable<string[]>
  minPrice$!:Observable<number>
  maxPrice$!:Observable<number>;
  minPriceControl!:number;
  maxPriceControl!:number;

  constructor(private productsService: ProductsService,private  categoriesService:CategoriesService){
  }
  ngOnInit(): void {
    this.productsService.getProducts$().subscribe(data=>{console.log(data)})
    this.products$ = this.productsService.getProducts$(); 
    this.minPrice$ = this.productsService.getMinPrice$()
    this.maxPrice$ = this.productsService.getMaxPrice$()
    this.categories$ = this.categoriesService.getCategories$()
  }

}
