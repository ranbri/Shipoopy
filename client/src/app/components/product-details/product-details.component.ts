import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Product } from 'src/app/models/product';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private element: any;
  public product: Product = new Product();
  public category: any;
  constructor(private modalService: ModalService, private el: ElementRef, private redux: NgRedux<AppState>, private cartService: CartService) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.modalService.add(this);
    document.body.appendChild(this.element);
  }
  // Open Panel
  public open(product: Product): void {
    this.product = product;
    this.element.children[0].style.display = 'block';
  }
  // Close Panel
  public close():void {
    this.element.children[0].style.display = 'none';
    this.element.children[0].children[0].children[3].value = 1;
  }
  // Adding Product To Cart
  public addProd(_id: string, quant: number): void {
    const product = this.redux.getState().foundProducts.length === 0 ? this.redux.getState().categoryProducts.find((p) => p._id === _id) : this.redux.getState().foundProducts.find((p) => p._id === _id);
    const cartProduct = {
      product: product,
      quant: +quant
    }
    this.cartService.addProd(cartProduct);
    this.close();
  }
}