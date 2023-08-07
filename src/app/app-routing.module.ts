import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCredential } from './enums/User.credentials.enum';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticatedGuard } from './guards/authanticated.guard';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),canActivate: [AuthenticatedGuard]},
  {
    path: 'products',
    component: ProductsComponent, // the parent component
    children:[
      {
        path: '',
        loadComponent: () => import('./pages/products-user-view/products-user-view.component').then(m => m.ProductsUserViewComponent),
        canActivate: [AuthGuard],
        data: { role: UserCredential.USER }
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/products-admin-view/products-admin-view.component').then(m => m.ProductsAdminViewComponent),
        canActivate: [AuthGuard,AdminGuard],
        data: { role: UserCredential.ADMIN }
      },
    ]
  },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
