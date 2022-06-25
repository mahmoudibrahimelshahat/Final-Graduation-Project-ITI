import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/products-service.service';
import { WishlistService } from 'src/app/services/whishlist/whishlist.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {


  productDetails: Product
  quantity = 1;
  endsub$: Subject<any> = new Subject<void>()
  id: string 
  updateCart : boolean


  constructor(private productService: ProductService, private cartService: CartService,private wishlistService : WishlistService, private actRoute: ActivatedRoute) {
    this.cartService.initCartLocalStorage();
  }

  ngOnInit(): void {

    // this.id = this.actRoute.snapshot.params?.['productItem_id'];
    // // this.idB.next(this.id);
    // // this.actRoute.params.subscribe((params) => {
    // //   if (params['productItemid']) {
    // //     const idParams = params['productItemid'];
    // // this.idB.subscribe(id=>{
    // //   this.id = id
    // // })
    // this._getProducts(this.id);
    // console.log(idParams)


    {
      this.actRoute.params.subscribe((params) => {
        if (params['productItem_id']) {
          this._getProducts(params['productItem_id']);

        }
      });
    }

  }


  ngOnDestroy(): void {
    this.endsub$.next(true)
    this.endsub$.complete()
  }



  private _getProducts(id: string) {

    this.productService.getProductById(id).pipe(takeUntil(this.endsub$)).subscribe((product) => {
      this.productDetails = product;
      // this.idB.next(this.productDetails._id)
      console.log(product + '_getproduct()')  
      console.log(this.productDetails._id) 


    })
  }



  addToCart() {
    const cartProduct: CartItem =
    {
      productId: this.productDetails._id, 
      quantity: this.quantity
    }

    this.cartService.setCartItem(cartProduct)

  }



  
  addToWishlist(){

    const cartItem : CartItem = 
  
    {
      productId :  this.productDetails._id,
      quantity : 1
    }
  
    return this.wishlistService.addProductToWishlist(cartItem , this.updateCart );
  }
  
}
 