import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, public redux: NgRedux<AppState>) { }

  ngOnInit() {
    // Cookie Check
    if (!document.cookie) this.router.navigate(['/sales']);
    // if (!this.redux.getState().currentUser && document.cookie) this.router.navigate(['/home']);
  }
}