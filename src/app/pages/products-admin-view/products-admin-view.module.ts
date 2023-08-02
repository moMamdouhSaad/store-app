import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsAdminViewComponent } from './products-admin-view.component';

const routes: Routes = [
  { path: '', component: ProductsAdminViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsAdminViewModule { }
