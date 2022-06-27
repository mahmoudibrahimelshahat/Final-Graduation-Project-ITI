import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  // CategoryId: string

  // productList: Product[] = [];
  // categoriesList: Category[] = [];
  // categoryProduct: Product[] = []
  // cartCount: number = 0;


  error: any = '';


  constructor() { }
  ngOnInit(): void {
    // this.loadProduct();
    // this.loadCategories();
  }


  
  // private loadProduct(selectedCategories?: string[]) {

  //   console.log('this is selected ' + selectedCategories)
  //   this.productService.getproducts(selectedCategories).subscribe((resProducts) => {
  //     this.productList = resProducts;
  //     console.log(this.productList +'all');

  //   });
  // }


  // private loadCategoryProducts(CategoryId?: string) {

  //   // console.log('this is selected ' +CategoryId)
  //   this.productService.getSingleCategoryproducts(CategoryId).subscribe((resProducts) => {
  //     this.productList = resProducts;
  //     console.log(this.productList + 'hello');

  //   });
  // }


  // private loadCategories() {
  //   this.categoriesService.getCategories().subscribe((resCategories) => {
  //     this.categoriesList = resCategories;
  //     // console.log(this.categoriesList);

  //   });
  // }



  // categoriesFilter() {
  //   const selectedCategories = this.categoriesList
  //     .filter(category => category.checked)
  //     .map(category => category._id)

  //   this.loadProduct(selectedCategories)
  // }


  // categoryFilter(id : string) {

  //   this.CategoryId = id

  //   this.loadCategoryProducts(this.CategoryId)


  // }

}
