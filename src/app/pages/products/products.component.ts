import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesListComponent } from 'src/app/shared/components/categories-list/categories-list.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule,CategoriesListComponent]
})
export class ProductsComponent implements OnInit {
  
  
  constructor(private readonly productsServices:ProductsService, private categoriesService:CategoriesService){

  this.productsServices.loadProducts();
  this.categoriesService.loadCategories();

    this.productsServices.getProducts$().subscribe(data=>{console.log(data)})
    

  }
  
  ngOnInit(): void {

      
  }

}
