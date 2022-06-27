import { CartItem } from './../../models/cart';
import { Product } from './../../models/product';
import { CartService } from './../../services/cart/cart.service';
import { WishlistService } from 'src/app/services/whishlist/whishlist.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.type';
import { AuthService } from 'src/app/services/auth.service';
import 'flowbite';
import * as AOS from'aos';
import { ProductService } from 'src/app/services/product/products-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  user:any;
  userName:any;
  isLogin:boolean=false;
  dataUser:User | null;

  
  @Input()
  productItem: Product

  updateCart: boolean = false;
  productList:Product[]=[]


  constructor(public auth:AuthService , private cartService : CartService ,
               private wishlistService : WishlistService ,
               private ProductService:ProductService  ) { 

 
    
    
    
    auth.currentUser.subscribe(()=>{
      if(auth.currentUser.getValue() !=null)
      {
        this.isLogin=true;
      }
      else{
        this.isLogin=false;
      }
    })
  }
  
  
  
  ngOnInit(): void {
    AOS.init();
    this.user = localStorage.getItem('dataUser');
    // console.log(this.user);
    // console.log(this.userName);
    this.cartService.initCartLocalStorage();
    this.wishlistService.initWishlistLocalStorage();
    this.ProductService.getproducts().subscribe(products=>{
      this.productList=products
    })


  }

  getNameUser() {
    return this.dataUser?.name;
  }
  getEmail() {
    return this.dataUser?.email;
  }

  isLogout(){
    this.auth.logout();
    this.isLogin = false;
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

    if(this.updateCart){
      this.updateCart = false
    }else
    {this.updateCart = true}


    // this.addUpdateStatus()
    const cartItem : CartItem = 
  
    {
      productId :  this.productItem._id,
      quantity : 1
    }
    return this.wishlistService.addProductToWishlist(cartItem , this.updateCart );
  }
  
  
addUpdateStatus(){

  const updated : string = JSON.stringify(this.updateCart)
  localStorage.setItem('update' , updated)

}

getUpdateStatus(){
  const updated : string = localStorage.getItem('update')
  this.updateCart  = JSON.parse(updated);
}
}




