import { Component, signal, effect, computed } from '@angular/core';
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
    <div [style.color]='color()'> {{ exPrice() | currency }} </div>
    
  `,
})
export class App {
  name = 'Angular';

  quantity = signal(1);
  qtyAvailable = signal([1,2,3,4,5,6]);

  selectedProduct = signal<Product>({
    id: 5,
    name: 'hammer',
    price: 12
  }) 

  exPrice =  computed(() => this.selectedProduct().price * this.quantity());
  color = computed(() => this.exPrice() > 50 ? 'green' : 'red');

  e = effect(() => console.log('In effect price', this.exPrice()));

  constructor() {
    console.log('In constructor: ', this.quantity());

    effect(()=> console.log('in effect: ', this.quantity()))

    this.quantity.update(q => q * 2);
  }

  onQuantitySelected(qtd: number){
    this.quantity.set(qtd);

    // this.quantity.set(67);
    // this.quantity.set(42);

  }
}

export interface Product {
  id: number; 
  name: string; 
  price: number;
}

bootstrapApplication(App);
