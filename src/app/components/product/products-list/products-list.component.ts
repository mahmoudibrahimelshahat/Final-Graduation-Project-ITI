

import { Component, OnInit, Input } from '@angular/core';
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
  @Input() id: ''


  productList: Product[] = [];
  categoriesList: Category[] = [];
  categoryProduct: Product[] = []

  error: any = '';


  constructor(private productService: ProductService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loadProduct();
    this.loadCategories();
    // this.categoriesFilter();

  }



  private loadProduct(selectedCategories?: string[]) {

    console.log('this is selected ' + selectedCategories)
    this.productService.getproducts(selectedCategories).subscribe((resProducts) => {
      this.productList = resProducts;
      console.log(this.productList);

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


}



