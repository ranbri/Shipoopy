import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivered',
  templateUrl: './delivered.component.html',
  styleUrls: ['./delivered.component.scss']
})
export class DeliveredComponent implements OnInit {

  constructor(
    private router: Router,
    private title: Title
    ) {
    this.title.setTitle("Shipoopi - Order Has Been Shipped");
  }

  ngOnInit() {
    setTimeout(() => {
    this.router.navigate(['/home']);
    }, 5000);
  }
  
}