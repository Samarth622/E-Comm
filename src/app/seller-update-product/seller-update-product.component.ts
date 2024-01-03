import { Component, OnInit } from '@angular/core';
import { AddProduct } from '../../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  productData : undefined | AddProduct;
  updateMessage : undefined | string;

  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;
    });
  }

  update(data: AddProduct) {
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
        if(result){
          this.updateMessage = "Product update successfully";
        }
    })
    setTimeout(() => {
      this.updateMessage = undefined;
      this.router.navigate(['seller-home'])
    }, 3000);
  }
}
