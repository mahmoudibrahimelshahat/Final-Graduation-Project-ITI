import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  getCategories(): Observable <any>
  {
  return this.http.get('http://localhost:3000/api/v1/categories')
  }


  
// getCategoriesById(id? : string[]): Observable <any>
// {
// return this.http.get('http://localhost:3000/api/v1/products?categories=id')
// }

}


