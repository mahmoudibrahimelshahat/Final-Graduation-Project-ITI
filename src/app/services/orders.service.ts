import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }



  getAllOrders(userId : string)
  {
    return this.httpClient.get<any>( `http://localhost:3000/api/v1/orders/get/userorders/${userId}`);
  }
  

}
