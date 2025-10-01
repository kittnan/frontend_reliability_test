import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, audit } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QeWindowPersonGuard  {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.auth.getToken() && this.auth.getAuthorizeQeWindowPerson() || this.auth.getAuthorizeAdmin()) {
      return true
    }
    this.router.navigate(['login'], { queryParams: route.queryParams });
    return false
  }

}
