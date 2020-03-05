import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Customer } from 'src/app/models/customer';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public customer = new Customer();
  public login: FormGroup;
  public constructor(private title: Title, private loginService: LoginService, public redux: NgRedux<AppState>) {
    title.setTitle('Shipoopi - Login');
  }

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  // Login Request
  public LoginCustomer() {
    this.redux.getState().loading = true;
    // Loading Time Out
    setTimeout(() => {
      this.loginService.LoginUser(this.customer);
    }, 1000);
  }
}
