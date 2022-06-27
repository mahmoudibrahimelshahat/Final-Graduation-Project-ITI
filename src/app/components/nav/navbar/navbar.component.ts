import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductService } from 'src/app/services/product/products-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  CategoryId: string

  categoriesList: Category[] = [];
  // cartCount: number = 0;
  currentCategory : string  


  constructor(private productService: ProductService, private categoriesService: CategoriesService, private cartService: CartService) { }
  ngOnInit(): void {
    // this.loadProduct();
    this.loadCategories();
  }


  





  private loadCategories() {
    this.categoriesService.getCategories().subscribe((resCategories) => {
      this.categoriesList = resCategories;
      // console.log(this.categoriesList);

    });
  }





  categoryFilter(id : string) {

    this.currentCategory = id
    this.cartService.idTransfer.next(this.currentCategory)

    // this.CategoryId = id

    // this.loadCategoryProducts(this.CategoryId)


  }



}
