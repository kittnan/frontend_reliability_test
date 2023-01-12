import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApproveGuard implements CanActivate {

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

    // this.route.queryParams.subscribe(res => console.log(res['id']))
    this.router.navigate(['/login'])

    return false
  }

}
