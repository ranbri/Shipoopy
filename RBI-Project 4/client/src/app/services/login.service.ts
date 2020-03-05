import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { Customer } from '../models/customer';
import { ActionType } from '../redux/actionType';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { Admin } from '../models/admin';
import { Cart } from '../models/cart';
import { Action } from '../redux/action';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public constructor(
    private cartService: CartService, 
    private httpClient: HttpClient, 
    private redux: NgRedux<AppState>, 
    private router: Router, 
    private userService: UserService
    ) { }

 
  // Log In
  public LoginUser(user: any): void {
    const credentials = { username: user.email, password: user.password };
    this.httpClient
      .post<Customer | Admin>('http://localhost:3000/api/auth/login', credentials, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('content-type', 'application/json')
      })
      .subscribe((user: any): void => {
        this.userService.reduxer(user);
        if (!user.admin) this.cartService.createCart(user.user);
        (user.admin) ? this.router.navigate([`/admin`]) : this.router.navigate([`/home`]);
      },
        err => {
          switch (err.error.message) {
            default:
              console.log(err.error);
              break;
            case "User Doesn't Exists":
              alert("Incorrect Email");
              this.redux.getState().loading = false;
              break;
            case "Incorrect Password":
              alert("Incorrect Password");
              this.redux.getState().loading = false;
              break;
            case "Missing Password":
              console.clear();
              this.redux.getState().admin = true;
              const user = err.error.user;
              user.password = credentials.password;
              alert("Welcome Admin.");
              this.userService.updateUser(user, true);
              break;
          }
        });
  }

   // Register
   public addCustomer(customer: Customer): void {
    customer.username = customer.email;
    this.httpClient
      .post<Customer | Admin>('http://localhost:3000/api/auth/register', customer, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('content-type', 'application/json')
      })
      .subscribe((customer: any): void => {
        alert("Welcome To Shipoopi! Shopping made EASY!")
        this.userService.reduxer(customer);
        this.cartService.createCart(customer.user);
        this.router.navigate(['/home']);
      },
        err => alert(err.error));
  }

  // Log Out
  public logout(user: Customer): void {
    const userType = this.redux.getState().admin ? "admin" : "customer";
    this.httpClient
      .post<Customer | Admin>(`http://localhost:3000/api/auth/logout/${userType}`, user, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('content-type', 'application/json')
      })
      .subscribe(() => {
        const action: Action = { type: ActionType.newCart, payload: new Cart() };
        this.redux.dispatch(action);
        this.redux.getState().currentUser = new Customer();
        this.redux.getState().loggedIn = false;
        this.redux.getState().foundProducts = [];
        this.redux.getState().loading = false;
        document.cookie += '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.router.navigate(['/sales']);
      },
        err => alert(err.error.message));
  }

  // Login Via Cookie Session
  public LoginCookie(): void {
    this.httpClient
      .get<Customer | Admin>('http://localhost:3000/api/auth/cookie', {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('Content-type', 'application/json')
      })
      .subscribe(async (user: any) => {
        await this.userService.reduxer(user);
        if (this.router.routerState.snapshot.url === '/home' && !user.admin) this.cartService.createCart(user.user);
        this.router.navigate([`${this.router.routerState.snapshot.url}`]);
      },
        err => {
          this.redux.getState().currentUser = new Customer();
          this.router.navigate(['/sales']);
          console.log(err.error.message);
        });
  }
}