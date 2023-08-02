import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsUserViewComponent } from './products-user-view.component';

const routes: Routes = [
  { path: '', component: ProductsUserViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsUserViewModule { }
