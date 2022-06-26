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

  CategoryId: string

  productList: Product[] = [];
  categoriesList: Category[] = [];
  categoryProduct: Product[] = []
  // cartCount: number = 0;


  error: any = '';
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
    this.loadProduct();
    this.loadCategories();
    
  }

  getNameUser() {
    return this.dataUser?.userName;
  }
  getEmail() {

    return this.dataUser?.user;
  }

  
  private loadProduct(selectedCategories?: string[]) {

    console.log('this is selected ' + selectedCategories)
    this.productService.getproducts(selectedCategories).subscribe((resProducts) => {
      this.productList = resProducts;
      console.log(this.productList +'all');

    });
  }


  private loadCategoryProducts(CategoryId?: string) {

    // console.log('this is selected ' +CategoryId)
    this.productService.getSingleCategoryproducts(CategoryId).subscribe((resProducts) => {
      this.productList = resProducts;
      console.log(this.productList + 'hello');

    });
  }


  private loadCategories() {
    this.categoriesService.getCategories().subscribe((resCategories) => {
      this.categoriesList = resCategories;
      // console.log(this.categoriesList);

    });
  }



  categoriesFilter() {
    const selectedCategories = this.categoriesList
      .filter(category => category.checked)
      .map(category => category._id)

    this.loadProduct(selectedCategories)
  }


  categoryFilter(id : string) {

    this.CategoryId = id

    this.loadCategoryProducts(this.CategoryId)


  }



}


