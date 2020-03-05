import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ModalService } from 'src/app/services/modal.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  public product: Product;
  public element: any;
  public saveChanges: FormGroup
  public file: File = null;
  constructor(private el: ElementRef, private modalService: ModalService, private productsService: ProductsService) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.saveChanges = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
    });
    this.modalService.add(this);
    document.body.children[0].children[0].children[1].children[1].children[0].appendChild(this.element);
  }
  ngOnDestroy() {
    this.element.remove();
  }
  // Open Panel
  public open(product: Product): void {
    this.product = product;
    this.element.children[0].classList = "show";
    this.element.parentElement.children[1].classList += " narrow";
  }
  // Close Panel
  public close(): void {
    this.product = undefined;
    this.element.children[0].classList = "hide";
    this.element.parentElement.children[1].classList = "cards-container";
  }
  // Uploading And Presenting
  public fileProgress(fileInput: any) {
    this.file = <File>fileInput.target.files[0];
    const mimeType = this.file.type;
    if (mimeType.match(/image\/*/) === null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.element.children[0].children[2].children[0].children[0].src = reader.result;
    }
  }
  // Saving Changes
  public save(): void {
    this.productsService.addOrUpdateProduct(this.product, this.file, "PUT").then(() => { this.close() }).catch(err => { console.log(err) });
  }
}
