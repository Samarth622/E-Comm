import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProduct } from '../../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchProduct : undefined | AddProduct[];

  constructor(private activateRoute : ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result) => {
      if(result){
        this.searchProduct = result;
      }
    })
  }

}
