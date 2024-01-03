import { Component, OnInit } from '@angular/core';
import { Cart, OrderData, OrderNow } from '../../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  totalAmount: number | undefined;
  cartData: Cart[] | undefined;
  orderMsg: string | undefined;

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      })
      this.totalAmount = price + (price/10) + 100 - (price/20);
      console.warn(this.totalAmount)
    })
  }
 
  orderNow(data: OrderNow) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.totalAmount){
      let orderData: OrderData = {
        ...data,
        totalAmount : this.totalAmount,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          if(item.id){
            this.product.deleteCart(item.id);
          }
        }, 900);
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if(result){
          this.orderMsg = "Your order has been placed";
          setTimeout(() => {
            this.router.navigate(['my-orders'])
            this.orderMsg = undefined
          }, 4000);
        }
      });
    }
  }

}
