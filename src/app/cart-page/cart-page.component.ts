import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, PriceSummary } from '../../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  allCart: undefined | Cart[];
  priceSummary: PriceSummary = {
    price: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    total: 0
  }

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadDetail();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  loadDetail() {
    this.product.currentCart().subscribe((result) => {
      this.allCart = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.tax = price / 10;
      this.priceSummary.discount = price / 20;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount;
      if(!this.allCart.length){
        this.router.navigate(['/']);
      }
    })
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.product.removeToCart(cartId).subscribe((result) => {
      if (result) {
        this.loadDetail();
      }
    })
  }
}
