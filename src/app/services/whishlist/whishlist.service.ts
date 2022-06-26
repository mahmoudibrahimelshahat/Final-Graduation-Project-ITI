import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

  wishlist$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getWishlist())
  

  updated : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  endSub$: Subject<any> = new Subject<void>()


  initWishlistLocalStorage() {

    const WishlistString: string = localStorage.getItem('wishlist');
    const cart: Cart = JSON.parse(WishlistString);

    if (!WishlistString) {
      const initialWishlist =
      {
        items: [],

      }
      const initialWishlistJson = JSON.stringify(initialWishlist)
      localStorage.setItem('wishlist', initialWishlistJson)
    }

  }


  addProductToWishlist(cartItem: CartItem, updateCartItem? : boolean): Cart {
    const wishlistString = localStorage.getItem('wishlist');
    const wishlist: Cart = JSON.parse(wishlistString);

    const wishlistExist = wishlist.items?.find((item) => item.productId === cartItem.productId);

    if (wishlistExist) {

      wishlist.items.map((item) => {
        
        if (item.productId === cartItem.productId) {

          updateCartItem = false

          const newWishlist = wishlist.items?.filter((item)=>
          { 
            
          return  item.productId !== cartItem.productId

          })
          wishlist.items = newWishlist;

        }

      });

    } else {

      updateCartItem = true;
      wishlist.items.push(cartItem);
    }

    const wishlistJson = JSON.stringify(wishlist);
    localStorage.setItem('wishlist', wishlistJson);
    this.wishlist$.next(wishlist);
    this.updated.next(updateCartItem)
    return wishlist;
  }



  getWishlist(){
   
      const WishlistJson: string = localStorage.getItem('wishlist');
      const wishlist: Cart = JSON.parse(WishlistJson);
      return wishlist;
  
  
  }

}
