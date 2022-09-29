import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QeDepartmentHeadGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router : Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.auth.getToken() && this.auth.getAuthorizeQeDepartmentHead()){
        return true
      }
    this.router.navigate(['/login'])

      return false
  }
}