import { StripeService } from 'ngx-stripe';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { CartItem } from 'src/app/models/cart';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = 'http://localhost:3000/api/v1/orders';
  apiURLProducts = 'http://localhost:3000/api/v1/products';
 final = 'http://localhost:3000/api/v1/orders/create-checkout-session';


  constructor(private http: HttpClient, private StripeService:StripeService) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }

  createCheckoutSession(orderItem :CartItem[]) {
    return this.http.post(`${this.final}`, orderItem).pipe(switchMap((session:{id:string})=> {
      return this.StripeService.redirectToCheckout({sessionId: session.id})
    }))}

    cahceOrderData(order:Order){
      localStorage.setItem('orderData', JSON.stringify(order))
    }

    getCahceOrderData(): Order{
    return  JSON.parse(localStorage.getItem('orderData'))
    }

    removeCahceOrderData(){
      localStorage.removeItem('orderData')
    }
} 
