import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticatedGuard } from './guards/authanticated.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),canActivate: [AuthenticatedGuard]},
  {
    path: 'user',
    loadChildren: () => import('./pages/products-user-view/products-user-view.module').then(m => m.ProductsUserViewModule),
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/products-admin-view/products-admin-view.module').then(m => m.ProductsAdminViewModule),
    canActivate: [AuthGuard,AdminGuard],
    data: { role: 'admin' }
  },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
