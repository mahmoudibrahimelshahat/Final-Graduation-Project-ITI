import { Subject, BehaviorSubject } from 'rxjs';
import { CartItem, Cart } from 'src/app/models/cart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  currentCategory : string  

  idTransfer : BehaviorSubject<string> = new BehaviorSubject<string>(null)

  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCartItem())

  constructor() {



  }


  categoryFilter() {
    
    // this.currentCategory = id
    this.idTransfer.next(this.currentCategory)

    // this.CategoryId = id

    // this.loadCategoryProducts(this.CategoryId)

  }

  initCartLocalStorage() {

    const cartString: string = localStorage.getItem('cart');
    const cart: Cart = JSON.parse(cartString);

    if (!cart) {
      const initialCart =
      {
        items: [],

      }
      const initialCartJson = JSON.stringify(initialCart)
      localStorage.setItem('cart', initialCartJson)
    }

  }



  setCartItem(cartItem: CartItem, updateCartItem? : boolean): Cart {
    const cartString = localStorage.getItem('cart');
    const cart: Cart = JSON.parse(cartString);

    const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {


      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {

          if (updateCartItem) {
            
            item.quantity = cartItem.quantity
      
          }else{
            
            item.quantity = cartItem.quantity + item.quantity

          }

          return item;
        }

        return item;

      });
    } else {
      cart.items.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    this.cart$.next(cart);
    return cart;
  }

  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem('cart', intialCartJson);
    this.cart$.next(intialCart);
    localStorage.removeItem('cart');
  }

  getCartItem() {
    const cartJson: string = localStorage.getItem('cart');
    const cart: Cart = JSON.parse(cartJson);
    return cart;
  }



  removeCartItem(id: string) {

    const cart = this.getCartItem();


    // const idIndex = cart.items?.findIndex((item)=>{ return item.productId !== id})
   
    // cart.items?.splice(idIndex,1)
   

    const newCart = cart.items?.filter((item)=>{ return item.productId !== id})
   
    cart.items = newCart
   
    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);

    this.cart$.next(cart);

  }



}
