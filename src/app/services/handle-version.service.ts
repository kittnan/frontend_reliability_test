import { Subscription, interval } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class HandleVersionService {
  interval$!: Subscription;
  constructor(
    private _router: Router,
    private _loading: NgxUiLoaderService
  ) { }


  start() {
    this.interval$ = interval(3000).subscribe(res => this.handleVersion())
  }
  private handleVersion() {
    let bypassPathList = [
      "/",
      "/login"
    ]
    // console.log(localStorage.getItem('RLS_version'));
    if (!bypassPathList.find((p: string) => p === this._router.url)) {
      if (localStorage.getItem('RLS_version') !== environment.VERSION) {
        if (confirm("New version available. Load New Version?")) {
          this.interval$.unsubscribe()
          localStorage.setItem('RLS_version', environment.VERSION)
          setTimeout(() => {
            window.location.reload();
          }, 1);
        }
      } else {
        // console.log('latest version');

      }
    }
  }

}
