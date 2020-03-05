import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Address } from 'src/app/models/address';
import { FormGroup, FormControl } from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  public address: Address;
  public addressForm: FormGroup;
  public creditForm: FormGroup;
  public cart: Cart;
  public deliveryForm: FormGroup;
  public creditBool: boolean = false;
  public months = [];
  public years = [];
  public minDate: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

  constructor(
    private title: Title,
    public redux: NgRedux<AppState>,
    private usersService: UserService,
    private orderService: OrderService,
    private cartService: CartService,
  ) {
    title.setTitle('Shipoopi - Checkout');
   }

  ngOnInit() {

    if (this.redux.getState().cities.length === 0) {
      fetch('http://localhost:3000/assets/site/cities/cities.json')
        .then(response => response.json())
        .then(cities => { this.redux.getState().cities = cities })
        .catch(err => { console.log(err) })
    }
    // Select Months
    for (let i = 1; i <= 12; i++) {
      i < 10 ? this.months.push(`0${i}`) : this.months.push(i.toString());
    };
    // Select Years 
    for (let i = +new Date().getFullYear().toString().slice(2); i <= +new Date().getFullYear().toString().slice(2) + 10; i++) {
      this.years.push(i.toString());
    };
    // Redirecting To Cash Out If Collapsing Occurs
    if (!this.redux.getState().currentUser) {
      setTimeout(() => {
        this.cartService.getCart();
      }, 1000); 
    }

    setTimeout(() => {
      if (this.redux.getState().currentUser.address) {
        if (!confirm(`Is Your Address: 
        ${this.redux.getState().currentUser.address.house}
        ${this.redux.getState().currentUser.address.street}, 
        ${this.redux.getState().currentUser.address.city}, 
        To Change address press cancel.`)) {
          this.redux.getState().currentUser.address = undefined;
          this.usersService.updateUser(this.redux.getState().currentUser, false);
        }
      }
    }, 100);

    //Creating The Form Groups 
    this.addressForm = new FormGroup({
      city: new FormControl(),
      street: new FormControl(),
      house: new FormControl(),
      entrance: new FormControl(),
      floor: new FormControl(),
      apartment: new FormControl()
    });
    this.creditForm = new FormGroup({
      number: new FormControl(),
      expire: new FormGroup({
         month: new FormControl(), 
         year: new FormControl() 
        }),
      cvv: new FormControl()
    });
    this.deliveryForm = new FormGroup({
      date: new FormControl(),
      time: new FormControl()
    })
  }

  public addAddress(){
    this.redux.getState().currentUser.address = this.addressForm.value;
    this.usersService.updateUser(this.redux.getState().currentUser, false);
  }

  
  order(){
    this.orderService.confirmOrder(this.creditForm.value, this.deliveryForm.value);
  }

  public addCC() {
    this.creditBool = true;
  }
}
