import { Component, OnInit, ElementRef } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public product: FormGroup;
  public file: File;
  public element: any;
  constructor(private title: Title, public redux:NgRedux<AppState>, private productsService:ProductsService, private el: ElementRef, private router:Router ) {
    this.element = el.nativeElement;
    this.title.setTitle('Admin - .jpg Images Please 🙏 ');
  }

  ngOnInit() {
    if (this.redux.getState().prodCategories.length === 0) {
      this.productsService.getCategories();
    }
    this.product = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      prodCategory: new FormControl()
    });
  }
  // Displaying Uploaded
  public fileProgress(fileInput: any) {
    this.file = <File>fileInput.target.files[0];
    const mimeType = this.file.type;
    if (mimeType.match(/image\/*/) === null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      const element = this.element.children[0].children[0].children[0].children[4].children[1].children[2].children[0].children[0].children[0];
      element.src = reader.result;
      console.log(element);
    }
  }

  // Add Product
  public addProd(){
    this.productsService.addOrUpdateProduct(this.product.value, this.file, "POST").then(() => { this.router.navigate(['/admin'])}).catch(err => { console.log(err) });
  
  }

}