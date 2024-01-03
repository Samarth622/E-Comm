import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AddProduct } from '../../data-type';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {

  productItem : undefined | AddProduct[];
  productMessage : undefined | string;

  deleteIcon = faTrash;
  updateIcon = faPenToSquare;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteItem(id).subscribe((result) =>{
      if(result){
        this.productMessage = "Product deleted successfully";
      }
      this.list();
      setTimeout(() => (this.productMessage = undefined), 3000)
    });
  }

  list() {
    this.product.productList().subscribe((result) =>{
      console.log(result)
      this.productItem = result;
    })
  }

}
