import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log('token:'+this.$localStorage.retrieve('authenticationtoken'));
    if (this.$localStorage.retrieve('authenticationtoken') || this.$sessionStorage.retrieve('authenticationtoken')) {
      // logged in so return true
      return true;
    }else{
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}