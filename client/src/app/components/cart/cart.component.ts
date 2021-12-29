import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public button = this.redux.getState().currentCart === undefined ? false : (this.redux.getState().currentCart.cartProducts.length === 0 ? true : false);
  constructor(public redux: NgRedux<AppState>, private cartService: CartService, public router: Router) { }
  ngOnInit() {
  }
  // Remove Item From Cart
  public removeItem(item) {
    this.cartService.deleteProduct(item.id);
  }
  // Clear Cart
  public clearCart() {
    this.cartService.clearCart();
  }
}