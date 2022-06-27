

import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private router: Router, private http: HttpClient) { }

  getproducts(selectedCategories?: string[]): Observable<Product[]> {
    let params = new HttpParams()
    if (selectedCategories) {
    params = params.append('categories', selectedCategories.join(','))
      console.log(params)
    }

    return this.http.get<Product[]>('http://localhost:3000/api/v1/products', { params: params });




  }

  getSingleCategoryproducts(id?: string): Observable<Product[]> {
    let params = new HttpParams()
    if (id) {
    params = params.append('categories', id)
      console.log(params)
    }

    return this.http.get<Product[]>('http://localhost:3000/api/v1/products', { params: params });
  }
  getProductById(productId: string): Observable<Product> {

    console.log('getProductById service')
    return this.http.get<Product>(`http://localhost:3000/api/v1/products/${productId}`)
    }

  }




