import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  templateUrl: './products-admin-view.component.html',
  styleUrls: ['./products-admin-view.component.scss']
})
export class ProductsAdminViewComponent implements OnInit {

  constructor(private productsService: ProductsService){
    this.productsService.getProducts$().subscribe(data=>{console.log(data)})
  }
  ngOnInit(): void {
      
  }

}
