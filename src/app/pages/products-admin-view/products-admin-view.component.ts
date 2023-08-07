import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ProductFormDialogActionTypes } from 'src/app/enums/ProductFormDialogActionTypes.enum';
import { Product } from 'src/app/models/products';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsTableComponent } from 'src/app/shared/components/products-table/products-table.component';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm.dialog';
import { ProductFormDialog } from 'src/app/shared/dialogs/product-form.dialog.ts/product-form.dialog';

@Component({
  templateUrl: './products-admin-view.component.html',
  styleUrls: ['./products-admin-view.component.scss'],
  standalone:true,
  imports:[CommonModule, FlexLayoutModule, ProductsTableComponent, MatButtonModule,MatDialogModule,MatSnackBarModule]
})
export class ProductsAdminViewComponent implements OnInit {
  products$!:Observable<Product[]>;

  constructor(private productsService: ProductsService,private dialog: MatDialog,
    private categoriesService:CategoriesService,private _snackBar: MatSnackBar){
    this.categoriesService.loadCategories();
    this.productsService.loadProductsToDashboard()
    this.products$ =  this.productsService.getProducts$()

  }
  ngOnInit(): void {
      
  }

  openProductFormDialog(product?:Product | any):void{
      const dialogRef = this.dialog.open(ProductFormDialog, {
        width: '400px',
        data: { product, action: product ? ProductFormDialogActionTypes.EDIT : ProductFormDialogActionTypes.ADD }
      });
  
      dialogRef.afterClosed().subscribe((result) => {

        if(result?.event == ProductFormDialogActionTypes.ADD){
          this.productsService.addNewProduct(result.product);
          this.openSnackBar('Item Added successfully')


       
        }else if(result.event == ProductFormDialogActionTypes.EDIT){
          this.productsService.updateProduct(result.product);
          this.openSnackBar('Item Updated successfully')

        }
      });
    
  }

  openConfirmDialog(id:number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Check the result of the dialog
      if (result === true) {
        this.openSnackBar('Item deleted successfully')
        // Delete the item here (perform the action)
        this.productsService.deleteProductWithId(id)
      }
    });
  }


  openSnackBar(msg:string) {
    this._snackBar.open(msg);
    setTimeout(() => {
      this._snackBar.dismiss()
    }, 2000);
  }
  
  }


