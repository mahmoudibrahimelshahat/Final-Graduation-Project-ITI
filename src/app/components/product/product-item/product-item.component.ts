import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { WishlistService } from 'src/app/services/whishlist/whishlist.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  productItem: Product

  updateCart: boolean = false


  constructor(private cartService : CartService , private wishlistService : WishlistService) { }

  ngOnInit(): void {
    this.cartService.initCartLocalStorage();
    this.wishlistService.initWishlistLocalStorage();
  }

   addProductToCart()
   {
    const cartItem : CartItem = 
  
    {
      productId :  this.productItem._id,
      quantity : 1
    }
  
    return this.cartService.setCartItem(cartItem)
  }
  
  addToWishlist(){

    const cartItem : CartItem = 
  
    {
      productId :  this.productItem._id,
      quantity : 1
    }
  
    return this.wishlistService.addProductToWishlist(cartItem , this.updateCart );
  }
  

}
