import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import decode from 'jwt-decode';
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  private token: string;
  private tokenPayload:{
    auth: ""
    exp: 0
    sub: ""
  }
  private isAllowed = false;

  constructor(private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService,
              public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property

    debugger;
    const expectedRole = route.data.expectedRole;
    this.token = this.$localStorage.retrieve('authenticationtoken')

    if(this.token === null){
      this.token = this.$sessionStorage.retrieve('authenticationtoken');
    }
    // decode the token to get its payload
    this.tokenPayload = decode(this.token);

    console.log(this.tokenPayload);
debugger;
    for (let auth of this.tokenPayload.auth.toString().split(',')){
      if (expectedRole != null){
        for (let expRole of expectedRole.split(',')){
          if(auth===expRole){
            this.isAllowed = true;
          }
        }
      }
    }

    if (!this.isAllowed) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
