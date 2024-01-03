import { EventEmitter, Injectable } from '@angular/core';
import { AddProduct, Cart, OrderData } from '../../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<AddProduct[] | []>();

  constructor(private http: HttpClient) { }

  addProduct(data: AddProduct) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productList(){
    return this.http.get<AddProduct[]>('http://localhost:3000/products');
  }

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string){
    return this.http.get<AddProduct>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: AddProduct) {
    return this.http.put(`http://localhost:3000/products/${data.id}`, data);
  }

  popularProduct(){
    return this.http.get<AddProduct[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts() {
    return this.http.get<AddProduct[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query : string){
    return this.http.get<AddProduct[]>(`http://localhost:3000/products?q=${query}`);
  }

  localCart(data: AddProduct){
    let cartData = [];
    let localData = localStorage.getItem('localData');
    if(!localData){
      localStorage.setItem('localData', JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else {
      cartData = JSON.parse(localData);
      cartData.push(data);
      localStorage.setItem('localData', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeCart(productId: number){
    let cartData = localStorage.getItem('localData');
    if(cartData){
      let items: AddProduct[] = JSON.parse(cartData);
      items = items.filter((item: AddProduct) => productId !== item.id);
      console.warn(items);
      localStorage.setItem('localData', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number){
    return this.http.get<AddProduct[]>('http://localhost:3000/cart?userId='+userId, {observe: 'response'}).subscribe((result) => {
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    });
  }

  removeToCart(cartId: number){
    return this.http.delete('http://localhost:3000/cart/'+cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }

  orderNow(data: OrderData){
    return this.http.post('http://localhost:3000/orders', data);
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<OrderData[]>('http://localhost:3000/orders?userId='+userData.id);
  }

  deleteCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/'+cartId, {observe: 'response'}).subscribe((result) => {
      if(result){
        this.cartData.emit([]);
      }
    })
  }

  cancelOrder(orderId: number){
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }
}
