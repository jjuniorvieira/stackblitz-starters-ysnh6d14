import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1> Shopping card </h1>


    <select
      [ngModel]="quantity()"
      (ngModelChange)="onQuantitySelected($event)"
    >
      <option disabled value="">--Select a quantity--</option>
    
      @for (q of qtyAvailable(); track q) {
        <option [value]="q">
          {{ q }}
        </option>
      }
    </select>

    <div> {{quantity()}} </div>
    <div> {{selectedProduct().name}} </div>
    <div> {{selectedProduct().price}} </div>
    
  `,
})
export class App {
  name = 'Angular';

  quantity = signal(5);
  qtyAvailable = signal([1,2,3,4,5,6]);
  selectedProduct = signal<Product>({
    id: 5,
    name: 'hammer',
    price: 12
  }) 


  constructor() {
    console.log('In constructor: ', this.quantity());
  }

  onQuantitySelected(qtd: number){

  }
}

export interface Product {
  id: number; 
  name: string; 
  price: number;
}

bootstrapApplication(App);
