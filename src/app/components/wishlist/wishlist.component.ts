import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartProduct } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/products-service.service';
import { WishlistService } from 'src/app/services/whishlist/whishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {


wishlistProducts : CartProduct [] = []
endSub$: Subject<any> = new Subject<void>()


  constructor(private productService: ProductService, private wishlistService : WishlistService, private cartService: CartService ) {}

  ngOnInit(): void {

    this.getWishlist()
  }


   getWishlist() {


    this.wishlistService.wishlist$.pipe(takeUntil(this.endSub$)).subscribe((responseCart) => {

      this.wishlistProducts = [];

      responseCart.items.forEach((wishlistItem) => {
        this.productService.getProductById(wishlistItem.productId).subscribe((productItem) => {
          if(wishlistItem.productId == productItem._id)
          {this.wishlistProducts.push({
            product: productItem,
            quantity: wishlistItem.quantity
          })


       } })

      })

      console.log(this.wishlistProducts)

    })

  }


    addToCart(product) {
    const cartProduct: CartItem =
    {
      productId : product.product.id,
      quantity : product.quantity
    }

    this.cartService.setCartItem(cartProduct)
  }


  deleteFromWishlist(Product : CartProduct){

  const item : CartItem = {
   productId : Product.product.id,
   quantity : Product.quantity
  }
    this.wishlistService.addProductToWishlist(item, true);
  }
}
