import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public background1: string = undefined;
  public background2: string = undefined;
  public background3: string = undefined;
  public background4: string = undefined;
  constructor(public redux: NgRedux<AppState>, private router: Router) { }
  ngOnInit() {
    // Being Color Responsive To Page Type
    if (this.router.routerState.snapshot.url === '/admin' || this.router.routerState.snapshot.url === '/home') {
      this.background1 = "#00AFF0";
      this.background2 = "#0077a3";
      this.background3 = "#009cd6";
      this.background4 = "#dde4e6";
    }
  }
}