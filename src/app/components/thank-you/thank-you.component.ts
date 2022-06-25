import { OrdersService } from 'src/app/services/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  constructor(private orderService: OrdersService, private cartService: CartService) { }

  ngOnInit(): void {
    const orderData = this.orderService.getCahceOrderData();
    this.orderService.createOrder(orderData).subscribe(()=>{
      this.cartService.emptyCart();
      this.orderService.removeCahceOrderData();
    });
    
  }

}
