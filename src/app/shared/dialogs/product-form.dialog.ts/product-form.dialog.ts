import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {  Product } from "src/app/models/products";
import { ProductFormDialogActionTypes } from "src/app/enums/ProductFormDialogActionTypes.enum";
import { Observable } from "rxjs";
import { CategoriesService } from "src/app/services/categories.service";
import { MatSelectModule } from "@angular/material/select";

@Component({
    standalone:true,
    imports:[MatDialogModule,CommonModule,FormsModule,MatInputModule,
        MatButtonModule,ReactiveFormsModule,FlexLayoutModule,MatFormFieldModule,
        MatIconModule,MaterialFileInputModule,
    MatSelectModule],
    templateUrl: 'product-form.dialog.html',
    styleUrls:['product-form.dialog.scss']
  })

  export class ProductFormDialog {
    form!: FormGroup;
    product:Product;
    categories$!: Observable<string[]>;
    action:ProductFormDialogActionTypes

    public listAccepts = [
        null,
        ".png",
        "image/*",
      ];
      maxSize= 16;
      productImg!:string;

     

    constructor(public dialogRef: MatDialogRef<ProductFormDialog>,private formBuilder: FormBuilder,private categoriesService:CategoriesService,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: {product:Product,action:ProductFormDialogActionTypes} 
        ) {
            this.product = {...data.product};
            this.action = data.action;
            this.categories$ = this.categoriesService.getCategories$();
            
        const product = this.product;
        this.productImg = product?product.image:'assets/def_product.png'
           
        this.form = this.formBuilder.group({
            title: [product?product.title:'', Validators.required],
            category: [product?product.category:'',Validators.required ],
            description: [product?product.description:'',Validators.required ],
            price: [product?product.price:'', [Validators.required, Validators.min(0)]],//Validators.required, Validators.min(0)
            image: [this.productImg], // Initialize the image control as null
          });

    }

     // Handle form submission
    onSubmit(): void {
        if (this.form.valid) {
            this.dialogRef.close('confirmed');
            const product: Product = {
                id:this.product?this.product.id:null,
                category: this.form.value.category,
                description: this.form.value.description,
                image: this.form.value.image,
                price: this.form.value.price,
                title: this.form.value.title
            }
            this.dialogRef.close({ event: this.action, product });
        }
    }





      onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input?.files?.length) {
          const file = input.files[0];
          this.form.patchValue({ image: URL.createObjectURL(file) });
          this.productImg = URL.createObjectURL(file)
          this.form.get('image')?.updateValueAndValidity();
          console.log(this.form.value)
        }
      }


  
  }