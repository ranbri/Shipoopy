import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { HttpClient } from '@angular/common/http';
import { ActionType } from '../redux/actionType';
import { ProdCategory } from '../models/prodCategory';
import { Product } from '../models/product';
import { Action } from '../redux/action';
import { ThumbnailComponent } from '../components/thumbnail/thumbnail.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public constructor(
    private redux: NgRedux<AppState>, 
    private httpClient: HttpClient, 
    private thumbnail: ThumbnailComponent
    ) { }

  // Categories
  public getCategories(): void {
    this.httpClient.get<ProdCategory[]>('http://localhost:3000/api/stock/categories')
      .subscribe(categories => {
        this.redux.getState().prodCategories = categories;
      }, err => alert(err));
  }

  // Products
  // Get Products By Category
  public getProdByCategory(_id): void {
    this.httpClient.get<Product[]>(`http://localhost:3000/api/stock/categories/${_id}`)
      .subscribe(products => {
        this.redux.getState().categoryProducts = products;
        this.redux.getState().loading = false;
      }, err => alert(err.message));
  }

  // Add Or Update Product
  public addOrUpdateProduct(product: Product, file: File | null, method: string): Promise<any> {
    return new Promise((res, rej) => {
      const request = method === "POST" ? this.httpClient.post<Product>(`http://localhost:3000/api/stock/products`, product) : this.httpClient.put<Product>(`http://localhost:3000/api/stock/products/${product._id}`, product);
      const updatePhoto = (file) => {
        const upload = new FormData();
        const category = this.redux.getState().prodCategories.find((c: ProdCategory) => { if (c._id === product.prodCategory) return c });
        upload.append('productName', this.thumbnail.delSpace(product.name));
        upload.append('category', this.thumbnail.delSpace(category.name));
        upload.append('file', file);
        this.httpClient.post(`http://localhost:3000/upload-image`, upload)
          .subscribe(() => {
            res();
          }, err => { rej(err) });
      }
      if (file) {
        request.subscribe(product => {
          const action: Action = { type: ActionType.updateProduct, payload: product };
          this.redux.dispatch(action);
        }, err => { rej(err) });
        updatePhoto(file);
      }
      else {
        request.subscribe(product => {
          const action: Action = { type: ActionType.updateProduct, payload: product };
          this.redux.dispatch(action);
        }, err => { rej(err) });
        res();
      }
    })
  }
  
  // Search
  public search(value: string): void {
    this.httpClient.get<Product[]>(`http://localhost:3000/api/stock/products/search/${value}`)
      .subscribe(products => {
        this.redux.getState().loading = false;
        this.redux.getState().foundProducts = products;
      }, err => alert(err.message))
  }
}