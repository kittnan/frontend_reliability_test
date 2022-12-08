import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reliability';

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  sideItems: any
  userLogin: any = ''
  authorize: any
  loginStatus: Boolean = false
  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private swUpdate: SwUpdate,
    private _router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.userLogin = localStorage.getItem('name');
    this.authorize = localStorage.getItem('authorize');

  }



  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
    this.loginValid()
    this.onAccess()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  loginValid() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }
  }

  onAccess() {
    if (this.authorize == 'admin') {
      this.sideItems = [
        {
          title: 'master',
          icon: 'discount',
          items: [
            {
              path: '/admin/user-manage',
              icon: 'manage_accounts',
              title: 'users',
            },
            // {
            //   path: '/admin/master-manage',
            //   icon: 'discount',
            //   title: 'Master'
            // },
            {
              path: '/admin/department',
              icon: 'groups_2',
              title: 'department'
            },
            {
              path: '/admin/section',
              icon: 'group',
              title: 'section'
            },
            {
              path: '/admin/authorize',
              icon: 'verified_user',
              title: 'authorize'
            },
            {
              path: '/admin/model',
              icon: 'change_history',
              title: 'model'
            },
            {
              path: '/admin/test-purpose',
              icon: 'bug_report',
              title: 'test-purpose'
            },
            {
              path: '/admin/functional-chamber',
              icon: 'api',
              title: 'functional-chamber'
            },

          ]
        },
        {
          title: 'chamber',
          icon: 'all_inbox',
          items: [

            {
              path: '/admin/chamber',
              icon: 'settings',
              title: 'manage'
            },
          ]
        },
        {
          title: 'operate',
          icon: 'hardware',
          items: [

            {
              path: '/admin/operate-group',
              icon: 'home_repair_service',
              title: 'group'
            },
            {
              path: '/admin/operate-items',
              icon: 'hardware',
              title: 'items'
            },
          ]
        }
      ];
    }
    if (this.authorize == 'request') {
      this.sideItems = [
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/request/request-sheet',
              icon: 'post_add',
              title: 'new request'
            },
            {
              path: '/request/manage',
              icon: 'feed',
              title: 'request manage'
            },
            {
              path: '/request/sheet',
              icon: 'post_add',
              title: 'new request TEST'
            },
          ]
        }
      ]
    }
    if (this.authorize == 'request_approve') {
      this.sideItems = [
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/approve',
              icon: 'home',
              title: 'manage',
            }
          ]
        }
      ]
    }
    if (this.authorize == 'qe_window_person') {
      this.sideItems = [
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/qe-window-person',
              icon: 'home',
              title: 'manage',
            }
          ]
        }
      ]
    }
    if (this.authorize == 'qe_engineer') {
      this.sideItems = [
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/qe-engineer',
              icon: 'home',
              title: 'manage',
            }
          ]
        }
      ]
    }
    if (this.authorize == 'qe_section_head') {
      this.sideItems = [
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/qe-section-head',
              icon: 'home',
              title: 'manage',
            }
          ]
        }
      ]
    }
    if (this.authorize == 'qe_department_head') {
      this.sideItems = [
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/qe-department-head',
              icon: 'home',
              title: 'manage',
            }
          ]
        }
      ]
    }
  }

  onLogout() {
    localStorage.clear()
    location.href = "/"
    // this._router.navigate(['/'])
  }


}
