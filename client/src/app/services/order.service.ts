import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private router: Router, 
    private redux: NgRedux<AppState>, 
    private httpClient: HttpClient
    ) { }

  public confirmOrder(cc: any, date: any): void {
    const customer = this.redux.getState().currentUser,
      cart = this.redux.getState().currentCart,
      address = customer.address;
    this.httpClient.post('http://localhost:3000/api/orders', new Order(customer, cart, address, date, cc))
      .subscribe(() => {
        this.httpClient.get(`http://localhost:3000/api/carts/close/${this.redux.getState().currentCart._id}`)
          .subscribe(() => {
            alert("Your package has been delivered successfully!");
            this.router.navigate([`/ordered`]);
          }, err => { console.log(err); });
      }, err => {
        console.log(err.error);
      });
  }
}