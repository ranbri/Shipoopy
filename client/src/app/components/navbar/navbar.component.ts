import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { LoginService } from 'src/app/services/login.service';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public title: Title, private loginService: LoginService, public redux: NgRedux<AppState>, private cartService: CartService, private productsService: ProductsService, public router: Router) { }

  ngOnInit() {
    // Auto loginenticate
    if (!this.redux.getState().currentUser && document.cookie) this.loginService.LoginCookie();
  }
  // Log Out
  public logout() {
    this.loginService.logout(this.redux.getState().currentUser);
  }
  // Checking Out
  public checkedOut(): boolean {
    return this.title.getTitle() === "Shipoopi | We're On Our Way" ? true : false;
  }
  // Restoring Cart
  public restoreCart() {
    this.cartService.createCart(this.redux.getState().currentUser);
  }
  // // Search Bar
  // Searching
  public changed(search: string): void {
    this.redux.getState().loading = true;
    this.redux.getState().foundProducts = [];
    search === "" ? this.redux.getState().searchOn = false : this.redux.getState().searchOn = true;
    if (search === "") this.redux.getState().loading = false;
    // Loading Time Out
    setTimeout(() => {
      this.redux.getState().searchOn ? this.productsService.search(search) : this.redux.getState().foundProducts = [];
    }, 1000);
  }
  // Reset Search
  public resetSearch(search: any): void {
    search.value = '';
    this.redux.getState().searchOn = false;
    this.redux.getState().foundProducts = [];
    search.focus();
  }
}