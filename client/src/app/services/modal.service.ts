import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];
  constructor() { }
  public add(modal: any): void {
    this.modals[0] = modal;
  }
  public open(product: any) {
    const modal = this.modals[0];
    modal.open(product);
  }
}
