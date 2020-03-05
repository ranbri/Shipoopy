import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { ProdCategory } from 'src/app/models/prodCategory';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit, OnChanges {
  public category: any;
  @Input() product: Product;
  public url: string;
  @Input() cursor: boolean = false;
  public width: string = undefined;
  constructor(private redux: NgRedux<AppState>, private router: Router) { }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.category || !changes.category.firstChange) {
      if (!changes.product.firstChange || changes.product.currentValue !== changes.product.previousValue) {
        this.ngOnInit();
      };
    }
  }
  ngOnInit() {
    if(this.router.routerState.snapshot.url === '/add-product') this.width = '40%';
    // Synthesizing URL
    if (this.product) {
      this.category = this.redux.getState().prodCategories.find((c: ProdCategory): string => { if (c._id === this.product.prodCategory) return c.name });
      if (this.category) {
        this.category = this.delSpace(this.category.name);
        const name = this.delSpace(this.product.name);
        this.url = `http://localhost:3000/assets/${this.category}/${name}.jpg`;
      }
    };
  }
  // Getting Rid Of Spaces
  public delSpace(name: string): string {
    return name.replace(/\s/g, "");
  }
}