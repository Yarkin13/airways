import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'cart', loadComponent: () => import('./pages/shopping-cart/shopping-cart.component').then((mod) => mod.ShoppingCartComponent) },
  { path: 'account', loadComponent: () => import('./pages/user-account/user-account.component').then((mod) => mod.UserAccountComponent) },
  { path: '', redirectTo: 'account', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
