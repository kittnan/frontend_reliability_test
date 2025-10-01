import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApproveGuard  {

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.auth.getToken() && this.auth.getAuthorizeApprove()) {
      return true
    }
    this.router.navigate(['login'], { queryParams: route.queryParams });
    return false
  }

}
