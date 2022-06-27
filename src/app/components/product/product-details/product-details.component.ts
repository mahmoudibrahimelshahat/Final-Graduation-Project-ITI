import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/models/cart';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductService } from 'src/app/services/product/products-service.service';
import { WishlistService } from 'src/app/services/whishlist/whishlist.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {


  productDetails: Product
  quantity = 1;
  endsub$: Subject<any> = new Subject<void>()
  id: string 
  updateCart : boolean = false


  CategoryId: string
  productList: Product[] = [];
  categoriesList: Category[] = [];
  categoryProduct: Product[] = []
  // cartCount: number = 0;


  error: any = '';

  constructor(private productService: ProductService, private cartService: CartService,private categoriesService:CategoriesService
    ,private wishlistService : WishlistService, private actRoute: ActivatedRoute) {
    this.cartService.initCartLocalStorage();
  }

  ngOnInit(): void {

    this.loadProduct();
    this.loadCategories();



    {
      this.actRoute.params.subscribe((params) => {
        if (params['productItem_id']) {
          this._getProducts(params['productItem_id']);

        }
      });
    }

  }


  ngOnDestroy(): void {
    this.endsub$.next(true)
    this.endsub$.complete()
  }



  private _getProducts(id: string) {

    this.productService.getProductById(id).pipe(takeUntil(this.endsub$)).subscribe((product) => {
      this.productDetails = product;
      // this.idB.next(this.productDetails._id)
      console.log(product + '_getproduct()')  
      console.log(this.productDetails.category) 


    })
  }



  addToCart() {
    const cartProduct: CartItem =
    {
      productId: this.productDetails._id, 
      quantity: this.quantity
    }

    this.cartService.setCartItem(cartProduct)

  }



  
  addToWishlist(){

    if(this.updateCart){
      this.updateCart = false
    }else
    {this.updateCart = true}

    
    const cartItem : CartItem = 
  
    {
      productId :  this.productDetails._id,
      quantity : 1
    }
  
    return this.wishlistService.addProductToWishlist(cartItem , this.updateCart );
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