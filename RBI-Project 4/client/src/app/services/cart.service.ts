import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { ActionType } from '../redux/actionType';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { DatePipe } from '@angular/common';
import { Action } from '../redux/action';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private redux: NgRedux<AppState>, 
    private httpClient: HttpClient, 
    private datePipe: DatePipe, 
    private router: Router
    ) { }

  // Create Cart
  public createCart(customer: Customer): void {
    let action: Action;
    this.redux.getState().loading = true;
    const post = (_id) => {
      this.httpClient.delete(`http://localhost:3000/api/carts/${_id}`)
        .subscribe(() => {
          this.httpClient.post('http://localhost:3000/api/carts', new Cart(customer, new Date()))
            .subscribe((cart: any) => {
              action = { type: ActionType.newCart, payload: cart.cart };
              this.redux.dispatch(action);
              this.redux.getState().loading = false;
            }, err => console.log(err.message));
        }, err => console.log(err.message));
    }
    this.httpClient.post('http://localhost:3000/api/carts', new Cart(customer, new Date()))
      .subscribe((cart: any) => {
        switch (cart.msg) {
          case "new":
            action = { type: ActionType.newCart, payload: cart.cart };
            this.redux.dispatch(action);
            this.redux.getState().loading = false;
            break;
          case "active":
            const activeDate = (this.datePipe.transform(new Date(cart.cart.date)));
            if (confirm(`You have an active cart from: ${activeDate}, would you like to resume it?`)) {
              action = { type: ActionType.newCart, payload: cart.cart };
              this.redux.dispatch(action);
              this.redux.getState().loading = false;
              break;
            }
            post(cart.cart._id);
            break;
          case "latest":
            const latestDate = (this.datePipe.transform(new Date(cart.cart.date)));
            if (confirm(`Would you like to reorder your Cart from:${latestDate}?`)) {
              cart.cart.active = true;
              this.httpClient.put('http://localhost:3000/api/carts', cart.cart)
                .subscribe(() => {
                  action = { type: ActionType.newCart, payload: cart.cart };
                  this.redux.dispatch(action);
                  this.redux.getState().loading = false;
                }, err => console.log(err.message));
              break;
            }
            post(cart.cart._id);
            break;
        }
      }, err => console.log(err.error));
  }
  // Get Cart
  public getCart() {
    this.httpClient.get<Cart>(`http://localhost:3000/api/carts/${this.redux.getState().currentUser._id}`)
      .subscribe((cart) => {
        this.redux.dispatch({ type: ActionType.newCart, payload: cart })
        if (cart.cartProducts.length === 0){
          alert('Your Cart Is Empty');
          this.router.navigate(['/home']);
        }
      }, err => { console.log(err) });
  }
  // Update Cart
  public updateCart(cartProduct: any, statement: string): void {
    let action: Action;
    const updateDB = (currentCart: Cart): void => {
      this.httpClient.put('http://localhost:3000/api/carts', currentCart)
        .subscribe(null, err => console.log(err.error));
    }
    switch (statement) {
      case "add":
        cartProduct.totalPrice = cartProduct.quant * cartProduct.product.price;
        action = { type: ActionType.addCartProduct, payload: cartProduct }
        this.redux.dispatch(action);
        updateDB(this.redux.getState().currentCart);
        break;
      case "update":
        cartProduct.totalPrice = cartProduct.quant * cartProduct.product.price;
        action = { type: ActionType.updateCartProduct, payload: cartProduct }
        this.redux.dispatch(action);
        updateDB(this.redux.getState().currentCart);
        break;
      case "delete":
        action = { type: ActionType.removeCartProduct, payload: cartProduct }
        this.redux.dispatch(action);
        updateDB(this.redux.getState().currentCart);
        break;
      case "clear":
        this.redux.getState().currentCart.cartProducts = [];
        this.redux.getState().currentCart.overallPrice = 0;
        updateDB(this.redux.getState().currentCart);
        break;
    }
  }
  // Delete Cart
  public deleteCart(_id: any): void {
    this.httpClient.delete(`http://localhost:3000/api/carts/${_id}`)
      .subscribe(info => console.log(info), err => console.log(err.error));
  }
  
  // Clear Cart
  public clearCart() {
    this.updateCart(null, "clear");
  }

  // Add Product
  public addProd(cartProduct: any): void {
    switch (this.redux.getState().currentCart.cartProducts.find((cp): any => cp.product._id === cartProduct.product._id)) {
      default:
        cartProduct.quant += this.redux.getState().currentCart.cartProducts.find((cp): any => cp.product._id === cartProduct.product._id).quant;
        this.updateCart(cartProduct, "update");
        break;
      case undefined:
        this.updateCart(cartProduct, "add");
        break;
    }
  }
  // Delete Product
  public deleteProduct(_id: any): void {
    this.updateCart(_id, "delete");
  }

}
