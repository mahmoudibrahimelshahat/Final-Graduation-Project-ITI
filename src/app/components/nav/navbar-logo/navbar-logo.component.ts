import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-navbar-logo',
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.css']
})
export class NavbarLogoComponent implements OnInit {

  cartCount: number = 0;


  constructor( private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart?.items?.length ?? 0;
    })
  }


}