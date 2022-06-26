import { OrdersService } from 'src/app/services/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  items: MenuItem[];

  home: MenuItem;
  checkout: MenuItem;
  cart: MenuItem;

  constructor(private orderService: OrdersService, private cartService: CartService) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Shopping Cart', routerLink: '/cart'},
      {label: 'Checkout', routerLink: '/checkout'},
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/'};


    const orderData = this.orderService.getCahceOrderData();
    this.orderService.createOrder(orderData).subscribe(()=>{
      this.cartService.emptyCart();
      this.orderService.removeCahceOrderData();
    });
    
  }

}
