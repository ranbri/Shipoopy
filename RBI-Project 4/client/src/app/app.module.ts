import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgRedux, NgReduxModule } from "ng2-redux";
import { AppState } from './redux/appState';
import { Reducer } from './redux/reducer';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SalesComponent } from './components/sales/sales.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { DeliveredComponent } from './components/delivered/delivered.component';
import { DatePipe } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    NavbarComponent, 
    SalesComponent, 
    HomeComponent, 
    RegisterComponent, 
    LoginComponent, 
    CartComponent, 
    ProductsComponent, 
    DeliveredComponent, 
    AdminComponent, 
    ThumbnailComponent, 
    ProductDetailsComponent, 
    LoadingComponent, 
    EditProductComponent, 
    AddProductComponent, CheckoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    NgReduxModule,
    FormsModule,
  ],
  providers: [DatePipe, ThumbnailComponent],
  bootstrap: [LayoutComponent]
})
export class AppModule {
  public constructor(redux: NgRedux<AppState>) {
    redux.configureStore(Reducer.reduce, new AppState());
  }
}