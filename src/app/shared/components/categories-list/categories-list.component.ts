import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  standalone:true,
  imports:[CommonModule,FlexLayoutModule,NgxSkeletonLoaderModule,RouterModule]
})
export class CategoriesListComponent {
  @Input() list!:string[] | null;
  constructor(private productsService: ProductsService) {

  }

  loadProductsWithCategory(category?:string):void{
    this.productsService.loadProducts(category)

  }

}
