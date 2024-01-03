import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { OrderData } from '../../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  orderData: OrderData[] | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.orderList().subscribe((result) => {
      if(result){
        this.orderData = result;
        console.warn(this.orderData)
      }
    })
  }

  cancelOrder(orderId: number | undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.product.orderList().subscribe((data) => {
        this.orderData = data;
      })
    })
  }

}
