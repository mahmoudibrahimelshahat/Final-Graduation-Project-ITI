import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartProduct } from 'src/app/models/cart';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductService } from 'src/app/services/product/products-service.service';
import { WishlistService } from 'src/app/services/whishlist/whishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistProducts: CartProduct[] = []
  endSub$: Subject<any> = new Subject<void>()

  CategoryId: string

  // productList: Product[] = [];
  // categoriesList: Category[] = [];
  // categoryProduct: Product[] = []
  Count: number = 0;
  updateCart: boolean = false
  
  p :number = 1


  error: any = '';

  constructor(private productService: ProductService, private wishlistService: WishlistService, private cartService: CartService, private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {

    this.getWishlist()
    // this.loadProduct();
    // this.loadCategories();


  }


  getWishlist() {


    this.wishlistService.wishlist$.pipe(takeUntil(this.endSub$)).subscribe((responseCart) => {

      this.wishlistProducts = [];
      this.Count = responseCart?.items.length ?? 0;

      responseCart.items.forEach((wishlistItem) => {
        this.productService.getProductById(wishlistItem.productId).subscribe((productItem) => {
          if (wishlistItem.productId == productItem._id) {
            this.wishlistProducts.push({
              product: productItem,
              quantity: wishlistItem.quantity
            })


          }
        })

      })

      console.log(this.wishlistProducts)

    })

  }


  addToCart(product) {
    const cartProduct: CartItem =
    {
      productId: product.product.id,
      quantity: product.quantity
    }

    this.cartService.setCartItem(cartProduct)
  }


  deleteFromWishlist(Product: CartProduct) {

    const item: CartItem = {
      productId: Product.product.id,
      quantity: Product.quantity
    }
    this.wishlistService.addProductToWishlist(item, true);
  }





  // private loadProduct(selectedCategories?: string[]) {

  //   console.log('this is selected ' + selectedCategories)
  //   this.productService.getproducts(selectedCategories).subscribe((resProducts) => {
  //     this.productList = resProducts;
  //     console.log(this.productList + 'all');

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


  // categoryFilter(id: string) {

  //   this.CategoryId = id

  //   this.loadCategoryProducts(this.CategoryId)

  // }
  

  addToWishlist(product : CartProduct){

    if(this.updateCart){
      this.updateCart = false
    }else
    {this.updateCart = true}


    // this.addUpdateStatus()
    const cartItem : CartItem = 
  
    {
      productId : product.product.id,
      quantity : 1
    }
    return this.wishlistService.addProductToWishlist(cartItem , this.updateCart );
  }
  



  }

