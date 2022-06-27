import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.type';
import { PopupComponent } from '../popup/popup.component';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductService } from 'src/app/services/product/products-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName:string | null;
  Email:string | null;
  dataUser:User;
  displayBasic: boolean;

  // CategoryId: string

  // productList: Product[] = [];
  // categoriesList: Category[] = [];
  // categoryProduct: Product[] = []
  // cartCount: number = 0;


  constructor(private productService: ProductService, private categoriesService: CategoriesService, private cartService: CartService) { }

  
  
  
  
  ngOnInit(): void {
    this.dataUser = JSON.parse(localStorage.getItem('dataUser')||'{}');
    // console.log( this.dataUser);
    // console.log( this.dataUser.user);
    // this.userName=localStorage.getItem('userName');
    // this.Email=localStorage.getItem('user');
    // console.log(this.userName,this.Email);
    this.userName=this.dataUser?.userName;
    this.Email=this.dataUser?.user;
  
    
  }

  getNameUser() {
    return this.dataUser?.userName;
  }
  getEmail() {

    return this.dataUser?.user;
  }

  
  








}


