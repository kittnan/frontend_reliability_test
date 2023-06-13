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
    // console.log(this._router.url);
    // console.log(bypassPathList.find((p: string) => p === this._router.url));

    if (!bypassPathList.find((p: string) => p === this._router.url)) {
      // console.log(environment.VERSION);

      if (localStorage.getItem('RLS_version') !== environment.VERSION) {
        if (confirm("New version available. Load New Version?")) {
          this.interval$.unsubscribe()
          localStorage.setItem('RLS_version', environment.VERSION)
          window.location.reload();
        }
      }
    }
  }

}
