import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { ProductsService } from 'src/app/services/products.service';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public category: string;
  constructor(private title: Title, public redux: NgRedux<AppState>, private productService: ProductsService, private cartService: CartService, private modalService: ModalService) {
    title.setTitle('Shipoopi - Shopping Made Easy');
  }
  ngOnInit() {
    if (this.redux.getState().prodCategories.length === 0) {
      this.productService.getCategories();
    }
  }
  // Loading All Products
  public loadProducts(): void {
    this.redux.getState().loading = true;
    // Loader Time
    setTimeout(() => {
      this.productService.getProdByCategory(this.category);
    }, 1000);
  }
  // Product Details Modal
    public prodDetails(product) {
    this.modalService.open(product);
  }

  // Add To Cart
  public addProd(_id: string, quant: number): void {
    const product = 
      this.redux.getState().foundProducts.length === 0 
      ?
      this.redux.getState().categoryProducts.find((p) => p._id === _id) 
      : 
      this.redux.getState().foundProducts.find((p) => p._id === _id);

    const cartProduct = {
      product: product,
      quant: +quant
    }
    this.cartService.addProd(cartProduct);
  }

  
}