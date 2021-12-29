import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Title } from '@angular/platform-browser';
import { ProductsService } from 'src/app/services/products.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(private title: Title, public redux: NgRedux<AppState>, private productService: ProductsService, private modalService: ModalService) {
    this.title.setTitle('Admin - Try No To Fuck Everything');
  }

  ngOnInit() {
    if (this.redux.getState().prodCategories.length === 0) {
      this.productService.getCategories();
    }
  }
  // Open Edit Window
  public edit(product) {
    this.modalService.open(product);
  }
}
