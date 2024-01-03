import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, Signup } from '../../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  showLogin = true;
  authError: string = '';

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit() : void{
    this.seller.reloadSeller()
  }

  signUp(data:Signup) : void {
    this.seller.sellerSignUp(data);
  }

  login(data:Login) : void {
    this.authError = "";
    this.seller.sellerLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = "Email or Password is incorrect."
      }
    })
  }
}
