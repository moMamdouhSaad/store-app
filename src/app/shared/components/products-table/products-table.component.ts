import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from 'src/app/models/products';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';




@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  standalone:true,
  imports:[CommonModule, MatTableModule,MatButtonModule, MatPaginatorModule],

})
export class ProductsTableComponent {
  dataSource!:MatTableDataSource<Product>
  // @Input() products!:Product[] | null;
  private _products!:Product[] | null;
  // @Input() products!:Product[] | null;

  @Input() set products( data: Product[] | null ) {
    this.dataSource= new MatTableDataSource<Product>(data as Product[]);
    this.dataSource.paginator = this.paginator; // Assign the paginator to the data source

  }
  displayedColumns: string[] = ['id', 'title', 'action'];

  @Output() editProductClicked = new EventEmitter<Product>();
  @Output() deleteProductClicked = new EventEmitter<number>();

    // Add the following properties for pagination
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    pageSize = 10; // Set your desired page size
    pageSizeOptions: number[] = [5, 10, 25, 50]; // Set the options for the page size selector
  

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;



  editProduct(product: Product): void {
    console.log('product')
    this.editProductClicked.emit(product)
  }
  
  deleteProduct(id:number):void{
    this.deleteProductClicked.next(id)
  }



}
