import { CartService } from 'src/app/services/cart/cart.service';


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductService } from 'src/app/services/product/products-service.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @Input() id: string

  p : number = 1


  productList: Product[] = [];
  categoriesList: Category[] = [];
  categoryProduct: Product[] = []

  error: any = '';
  CategoryId: string

  enteredSearchValue : string = ''

  @Output()
  searchTextChanged : EventEmitter<string> = new EventEmitter<string>()

  constructor(private productService: ProductService, private categoriesService: CategoriesService ,private  CartService : CartService) { }

  ngOnInit(): void {
    this.loadProduct();
    this.loadCategories();
    // this.categoriesFilter();

this.categoryFilter0()
  }




  onSearch(){
 this.searchTextChanged.emit(this.enteredSearchValue)
  }

  private loadProduct(selectedCategories?: string[]) {

    console.log('this is selected ' + selectedCategories)
    this.productService.getproducts(selectedCategories).subscribe((resProducts) => {
      this.productList = resProducts;
      console.log(this.productList);

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
      console.log(this.categoriesList);

    });
  }



  categoriesFilter() {
    const selectedCategories = this.categoriesList
      .filter(category => category.checked)
      .map(category => category._id)

    this.loadProduct(selectedCategories)


  }

  // categoryFilter(id : string) {

  //   this.CategoryId = id

  //   this.loadCategoryProducts(this.CategoryId)


  // }


  categoryFilter0() {

this.CartService.idTransfer.subscribe(id=>{
  this.loadCategoryProducts(id)

})


  }
  


}


