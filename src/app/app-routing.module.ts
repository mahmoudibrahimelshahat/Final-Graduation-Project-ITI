import { ProductsListComponent } from './components/product/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartProductComponent } from './components/cart/cart-product/cart-product.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterationComponent } from './components/Auth/registeration/registeration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


const routes: Routes = [
  {path:'products/:productItem_id',canActivate:[AuthGuard], component: ProductDetailsComponent},
  {path:'list',canActivate:[AuthGuard], component: ProductsListComponent},
  // {path:'detail', component: ProductDetailsComponent},
  {path:'cart', canActivate:[AuthGuard],component:CartProductComponent},
  {path: 'checkout',canActivate:[AuthGuard], component: CheckoutComponent},
  {path: 'success',canActivate:[AuthGuard], component: ThankYouComponent},
  {path:'' , canActivate:[AuthGuard],component: HomeComponent},
  {path:'login' , component: LoginComponent},
  {path:'register' , component: RegisterationComponent},
  {path:'profile',canActivate:[AuthGuard], component: ProfileComponent},
  {path:'about',canActivate:[AuthGuard], component: AboutComponent},
  {path:'contact',canActivate:[AuthGuard], component: ContactComponent},
  {path:'whishlist',canActivate:[AuthGuard], component: WishlistComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
