import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesListComponent } from 'src/app/shared/components/categories-list/categories-list.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsUserViewComponent } from '../products-user-view/products-user-view.component';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CategoriesListComponent, ProductsUserViewComponent]
})
export class ProductsComponent implements OnInit {


  constructor(private readonly productsServices: ProductsService, private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {

    const categoryParam = this.route.snapshot.queryParamMap.get('category') as string;
    this.productsServices.loadProducts(categoryParam);
    this.categoriesService.loadCategories();
  }


}
