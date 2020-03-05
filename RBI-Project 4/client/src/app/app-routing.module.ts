import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './components/sales/sales.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DeliveredComponent } from './components/delivered/delivered.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
  {path: 'sales', component: SalesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'ordered', component: DeliveredComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/sales'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 