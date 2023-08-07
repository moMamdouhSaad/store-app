import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import {MatSliderModule} from '@angular/material/slider';
import { FilterComponent } from 'src/app/shared/components/filter/filter.component';
import { CategoriesService } from 'src/app/services/categories.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductCardSkeletonComponent } from 'src/app/shared/components/product-card-skeleton/product-card-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  templateUrl: './products-user-view.component.html',
  styleUrls: ['./products-user-view.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ProductCardComponent,ProductCardSkeletonComponent,FlexLayoutModule,MatSliderModule,FilterComponent,MatCheckboxModule,NgxSkeletonLoaderModule]
})
export class ProductsUserViewComponent implements OnInit {
  products$!:Observable<Product[]>
  categories$!:Observable<string[]>
  minPrice$!:Observable<number>
  maxPrice$!:Observable<number>;
  selectedCategory$!:Observable<string>;

  minPriceControl!:number;
  maxPriceControl!:number;
  fakeArray: number[] = Array.from({ length: 8 });


  constructor(private productsService: ProductsService,private  categoriesService:CategoriesService){
  }
  ngOnInit(): void {
    this.products$ = this.productsService.getProducts$(); 
    this.minPrice$ = this.productsService.getMinPrice$()
    this.maxPrice$ = this.productsService.getMaxPrice$()
    this.categories$ = this.categoriesService.getCategories$();
    this.selectedCategory$ = this.productsService.getSelectedCategory$()
  }

}
