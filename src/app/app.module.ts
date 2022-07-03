import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsSearchComponent } from './components/product/products-search/products-search.component';
import { ProductsListComponent } from './components/product/products-list/products-list.component';
import { RelatedProductsComponent } from './components/cart/related-products/related-products.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import {BadgeModule} from 'primeng/badge';
import { CartProductComponent } from './components/cart/cart-product/cart-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { NgxStripeModule } from 'ngx-stripe';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterationComponent } from './components/Auth/registeration/registeration.component';
import { SharedComponent } from './components/Auth/shared/shared.component';
import { EditEmailComponent } from './components/edit-email/edit-email.component';
import { HomeComponent } from './components/home/home.component';
import { LogoComponent } from './components/logo/logo.component';
import { PopupComponent } from './components/popup/popup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileOrderComponent } from './components/profile-order/profile-order.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {RatingModule} from 'primeng/rating';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { NavbarLogoComponent } from './components/nav/navbar-logo/navbar-logo.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileInfoComponent } from './profile-info/profile-info.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsSearchComponent,
    ProductsListComponent,
    RelatedProductsComponent,
    WishlistComponent,
    CategoriesComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    CartItemComponent,
    CartProductComponent,
    CheckoutComponent,
    ThankYouComponent,
    LoginComponent,
    RegisterationComponent,
    SharedComponent,
    EditEmailComponent,
    HomeComponent,
    LogoComponent,
    PopupComponent,
    ProfileComponent,
    ProfileOrderComponent,
    SideNavComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    NavbarComponent,
    NavbarLogoComponent,
    ProfileInfoComponent,
  ],
  imports: [BrowserModule,NgxPaginationModule,DialogModule, ButtonModule,CommonModule, BreadcrumbModule,AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule , BadgeModule,ReactiveFormsModule,RatingModule,
    NgxStripeModule.forRoot('pk_test_51LAHRkDcklN39IybeFn1mPXwjK5zmDTS93UCM7gLDvAgoDFAeI0aizpNpkgLyMPWyrbWaZtEzWNI2ZbZgeBantHH00XSZXcTpG'),],
  providers: [
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
