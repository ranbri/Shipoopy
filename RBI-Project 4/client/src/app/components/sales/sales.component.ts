import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  public constructor(private title: Title, private redux: NgRedux<AppState>, private router: Router) {
    title.setTitle('Shipoopi - Sales');
  }

  ngOnInit() {
    // if (!this.redux.getState().currentUser && document.cookie) this.router.navigate(['/home']);
  }

}
