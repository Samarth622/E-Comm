import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AddProduct, Cart } from '../../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productDetail: undefined | AddProduct;
  productQuantity: number = 1;
  removeCart = false;
  cartData: AddProduct | undefined;

  constructor(private product: ProductService, private ActivateRoute: ActivatedRoute) { }

  ngOnInit() {
    const productId = this.ActivateRoute.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productDetail = result;

      let cartData = localStorage.getItem('localData');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: AddProduct) => productId == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        setTimeout(() => {
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter((item: AddProduct) => productId?.toString() === item.productId?.toString());
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          })
        }, 500);
      }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productDetail) {
      this.productDetail.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localCart(this.productDetail);
        this.removeCart = true;
      }
      else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: Cart = {
          ...this.productDetail,
          userId,
          productId: this.productDetail.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((data) => {
          if (data) {
            setTimeout(() => {
              this.product.getCartList(userId);
              this.removeCart = true;
            },500);
          }
        })
      }
    }
  }

  removeToCart(productId: number) {
    if(!localStorage.getItem('user')){
      this.product.removeCart(productId);
    }
    else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) =>{
        if(result){
          this.product.getCartList(userId);
        }
      })
    }
    this.removeCart = false;
  }

}
