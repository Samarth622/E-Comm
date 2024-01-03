import { Component, OnInit } from '@angular/core';
import { AddProduct } from '../../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;

  constructor(private product: ProductService, private route: Router) {}

  ngOnInit(): void {
  
  }

  addProductItem(data : AddProduct){
    this.product.addProduct(data).subscribe((result) =>{
      if(result){
        this.addProductMessage = "Product added successfully";
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    })
  }

}
