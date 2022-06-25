import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  cartCount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart?.items?.length ?? 0;
    })

  }

}
