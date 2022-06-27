import { CartService } from 'src/app/services/cart/cart.service';
import { Cart, CartItem, CartProduct } from 'src/app/models/cart';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ORDER_STATUS } from 'src/app/models/order.constants';
import { MenuItem } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';
import { ProductService } from 'src/app/services/product/products-service.service';
import { User } from 'src/app/models/user.type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productCart: CartProduct[] = []
  items: MenuItem[];

  home: MenuItem;
  checkout: MenuItem;
  cart: MenuItem;
  cartCount = 0;

  dataUser:User;
  userId:any;

totalPrice: number

endSub$: Subject<any> = new Subject<void>()


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
     private productService: ProductService

  ) {}
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: CartItem[] = [];
 
  userName:string | null;


  ngOnInit(): void {
    this.dataUser = JSON.parse(localStorage.getItem('dataUser')||'{}');
    this.userId=this.dataUser?.userId;

    this.items = [
      {label: 'Shopping Cart', routerLink: '/cart'},
      {label: 'Checkout', routerLink: '/checkout'},
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/'};

    this._initCheckoutForm();
    this._getCartItems();
    this._getCartDetails()
    this.getOrderSummary()
  }



  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCartItem();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
    console.log(this.orderItems);
    
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

   
console.log(this.userId);
 

    const order: Order = {
      // this.userId : user.id,
      orderItems: this.orderItems,
      email: this.checkoutForm?.['email'].value,
      firstName: this.checkoutForm?.['firstName'].value,
      lastName: this.checkoutForm?.['lastName'].value,
      city: this.checkoutForm?.['city'].value,
      zip: this.checkoutForm?.['zip'].value,
      country: this.checkoutForm?.['country'].value,
      phone: this.checkoutForm?.['phone'].value,
      address: this.checkoutForm?.['address'].value,
      status: Object.keys(ORDER_STATUS)[0],
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.cahceOrderData(order);
    
    this.ordersService.createCheckoutSession(this.orderItems).subscribe(error => {
      if(error){
        console.log('error in redirect to payment')
      }
    });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
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
}
