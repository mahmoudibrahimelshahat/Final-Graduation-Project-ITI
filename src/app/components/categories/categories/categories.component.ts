import { Product } from './../../../models/product';
import { CategoriesService } from './../../../services/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import {Category} from '../../../models/category'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories : Category 
  error : ''

  constructor( private categoryService : CategoriesService) { }

  
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      // if (data.status == 'success') {
        this.categories = data.categories;
        // console.log(this.categories);
      // } else {
      //   this.error = data;
        console.log(this.categories)
      // }
    });
  }


  // loadCategoriesProducts(){
  //   this.categoryService.getCategoriesById().subscribe((data) =>{
  //   this.categoryProduct = data
  //   console.log(this.categoryProduct)
  //   })     categoryProduct : Product

  // }

}
