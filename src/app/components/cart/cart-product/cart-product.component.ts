import { CartItem } from 'src/app/models/cart';
import { CartProduct } from './../../../models/cart';
import { Product } from './../../../models/product';
import { ProductService } from './../../../services/product/products-service.service';
import { takeUntil, BehaviorSubject, Subject, take } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from './../../../services/cart/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { WishlistService } from 'src/app/services/whishlist/whishlist.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit, OnDestroy {
  p : number = 1


  productCart: CartProduct[] = []
  cartCount = 0;
  endSub$: Subject<any> = new Subject<void>()

  totalPrice: number
  isCheckout = false
  productDetails: Product

  quantity = 1;

  emptyCart : number


  error: any = '';

  constructor(private cartService: CartService, private productService: ProductService, private router: Router ,private wishlistService: WishlistService,private categoriesService: CategoriesService) {

    this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);

   }

  ngOnInit(): void {



    this._getCartDetails()
    this.getOrderSummary()
    console.log(this.productCart)

  }

  ngOnDestroy(): void {
    this.endSub$.next(true)
    this.endSub$.complete()
  }


  addToCart() {
    const cartProduct: CartItem =
    {
      productId: this.productDetails._id, 
      quantity: this.quantity
    }

    this.cartService.setCartItem(cartProduct)

  }
  private _getCartDetails() {


    this.cartService.cart$.pipe(takeUntil(this.endSub$)).subscribe((responseCart) => {

      this.productCart = [];
      this.cartCount = responseCart?.items.length ?? 0;

      responseCart.items.forEach((cartItem) => {
        this.productService.getProductById(cartItem.productId).subscribe((productItem) => {
          this.productCart.push({
            product: productItem,
            quantity: cartItem.quantity
          })

        })
      })
    })

  }


  deleteCartItem(CartItem: CartProduct) {
    this.cartService.removeCartItem(CartItem.product?.id)
  }


  getOrderSummary() {

    this.cartService.cart$.pipe(takeUntil(this.endSub$)).subscribe((responseCart) => {
      this.totalPrice = 0;
      if (responseCart) {
        responseCart.items.map((cartItem) => {
          this.productService.getProductById(cartItem.productId).pipe(take(1)).subscribe((productItem) => {

            this.totalPrice += productItem.price * cartItem.quantity;

          })


        })
      }
    }




    )
  }

  updateCartQuantity($event, product : CartProduct) {
    console.log($event.target.value)
   this.cartService.setCartItem({
    productId: product.product.id,
    quantity: $event.target.value
   }, true)
  }


  navigateToCheckout(){
    this.router.navigate(['/checkout'])
  }

  updateCart : boolean = false


addToWishlist(){

    if(this.updateCart){
      this.updateCart = false
    }else
    {this.updateCart = true}

    
    const cartItem : CartItem = 
  
    {
      productId :  this.productDetails._id,
      quantity : 1
    }
  
    return this.wishlistService.addProductToWishlist(cartItem , this.updateCart );
  }
  
 
}
