import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SellerService } from './services/seller.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthGuard implements CanActivate {


  constructor(private sellerService: SellerService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {

    if(localStorage.getItem('seller')){
      return true;
    }

    return this.sellerService.isSellerLoggedIn; // AUTH LOGIC HERE.
  }

}