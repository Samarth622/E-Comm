import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { AddProduct } from '../../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  popularItem : undefined | AddProduct[];
  trendyItem : undefined | AddProduct[];

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProduct().subscribe((data) =>{
      this.popularItem = data;
    })

    this.product.trendyProducts().subscribe((data) => {
      this.trendyItem = data;
    })
  }
  
}
