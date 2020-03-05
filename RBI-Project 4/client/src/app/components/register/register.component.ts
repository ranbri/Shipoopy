import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public customer = new Customer();
  public registration: FormGroup;
  public constructor(private title: Title, private loginService: LoginService, public redux: NgRedux<AppState>) {
    title.setTitle('Shipoopi - Register');
  }
  ngOnInit() {
    this.registration = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }
  // Adding Customer
  public addCustomer() {
    this.redux.getState().loading = true;
    setTimeout(() => {
      this.loginService.addCustomer(this.customer);
    }, 1000);
  }
}