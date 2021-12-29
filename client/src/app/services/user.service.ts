import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Admin } from '../models/admin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private redux: NgRedux<AppState>, 
    private httpClient: HttpClient,
    private router: Router
    ) { }

  public reduxer = (user: any): any => {
    this.redux.getState().currentUser = user.user;
    this.redux.getState().loggedIn = true;
    this.redux.getState().admin = user.admin ? true : false;
    this.redux.getState().searchOn = false;
    this.redux.getState().loading = false;
  }
  public updateUser(user: Customer | Admin, statement: boolean): void {
    const credentials = { user: user, admin: this.redux.getState().admin };
    const updateUser = (credentials) => {
      this.httpClient.put('http://localhost:3000/api/users', credentials, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('content-type', 'application/json')
      })
        .subscribe(null, err => { console.log(err.error) });
    }
    const updateAndRedirect = (credentials) => {
      this.httpClient.put('http://localhost:3000/api/users', credentials, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('content-type', 'application/json')
      })
        .subscribe(admin => {
          this.reduxer({user: admin, admin: true});
          this.router.navigate(['/admin']);
        }, err => { console.log(err) });
    }
    statement ? updateAndRedirect(credentials) : updateUser(credentials);
  }
}