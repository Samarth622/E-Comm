import { Component, OnInit } from '@angular/core';
import { AddProduct, Cart, Signup, UserSignup } from '../../data-type';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';

  constructor(private user: UserService, private router: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signup(data: UserSignup) {
    this.user.userSignup(data);
  }

  login(data: Signup){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if(result){
        this.authError = "Please enter valid details";
      }
      else{
        setTimeout(() => this.locatCartToRemote(), 500);
      }
    })
  }

  userOpenLogin() {
    this.showLogin = true;
  }

  userOpenSignup() {
    this.showLogin = false;
  }

  locatCartToRemote() {
    let data = localStorage.getItem('localData');
    let userDetail = localStorage.getItem('user');
    let userId = userDetail && JSON.parse(userDetail).id;
    if(data){
      let cartDataList: AddProduct[] = JSON.parse(data);

      cartDataList.forEach((product: AddProduct, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if(result){
              
            }
          })
          if(cartDataList.length === index+1){
            localStorage.removeItem('localData');
          }
        }, 500);
      })
    }
    setTimeout(() => this.product.getCartList(userId), 500);
  }

}
