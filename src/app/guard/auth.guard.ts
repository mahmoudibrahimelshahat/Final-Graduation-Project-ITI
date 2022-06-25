import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.auth.currentUser.getValue() !=null)
      {
        return true;
      }
      else
      {
        alert('You must login First')
        // this.router.navigate(['/login']);
        this.router.navigate(['/login'], {queryParams :{returnUrl :state.url}});
        return false;
      }

    // return true;
  }
  
}
