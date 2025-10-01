import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QeDepartmentHeadGuard  {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.auth.getToken() && this.auth.getAuthorizeQeDepartmentHead()) {
      return true
    }
    this.router.navigate(['login'], { queryParams: route.queryParams });
    return false
  }
}
