import { CartService } from 'src/app/services/cart/cart.service';
import { Cart, CartItem } from 'src/app/models/cart';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ORDER_STATUS } from 'src/app/models/order.constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,

  ) {}
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: CartItem[] = [];
  userId = "62b36d93ab1ef738687c672e";

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
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
}
