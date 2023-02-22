import { environment } from 'src/environments/environment';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
    private _router: Router,
    private _loading: NgxUiLoaderService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.userLogin = localStorage.getItem('RLS_userName');
    this.authorize = localStorage.getItem('RLS_authorize');

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
    setTimeout(() => {
      console.log(this.swUpdate);

    }, 1000);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  loginValid() {
    const token = localStorage.getItem('RLS_token');
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
          title: 'dashboard',
          icon: 'dashboard',
          items: [
            {
              path: '/dashboard',
              icon: 'dashboard',
              title: 'main'
            },

          ]
        },
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/admin/request-manage',
              icon: 'feed',
              title: 'manage'
            },

          ]
        },
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
              path: '/admin/testing-type',
              icon: 'bug_report',
              title: 'testing-type'
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
        },
        {
          title: 'approver',
          icon: 'diversity_3',
          items: [
            {
              path: '/admin/approver',
              icon: 'group',
              title: 'manage'
            },

          ]
        },
      ];
    }
    if (this.authorize == 'request') {
      this.sideItems = [
        {
          title: 'dashboard',
          icon: 'dashboard',
          items: [
            {
              path: '/dashboard',
              icon: 'dashboard',
              title: 'main'
            },

          ]
        },
        {
          title: 'request',
          icon: 'feed',
          items: [

            {
              path: '/request/sheet',
              icon: 'post_add',
              title: 'new'
            },
            {
              path: '/request/manage',
              icon: 'feed',
              title: 'manage'
            },

          ]
        }
      ]
    }
    if (this.authorize == 'request_approve') {
      this.sideItems = [
        {
          title: 'dashboard',
          icon: 'dashboard',
          items: [
            {
              path: '/dashboard',
              icon: 'dashboard',
              title: 'main'
            },

          ]
        },
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
          title: 'dashboard',
          icon: 'dashboard',
          items: [
            {
              path: '/dashboard',
              icon: 'dashboard',
              title: 'main'
            },

          ]
        },
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
    if (this.authorize == 'qe_engineer' || this.authorize == 'qe_engineer2') {
      this.sideItems = [
        {
          title: 'dashboard',
          icon: 'dashboard',
          items: [
            {
              path: '/dashboard',
              icon: 'dashboard',
              title: 'main'
            },

          ]
        },
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
          title: 'dashboard',
          icon: 'dashboard',
          items: [
            {
              path: '/dashboard',
              icon: 'dashboard',
              title: 'main'
            },

          ]
        },
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
    Swal.fire({
      title: `Do you want to logout?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
        localStorage.removeItem('RLS_token')
        localStorage.removeItem('RLS_id')
        localStorage.removeItem('RLS_authorize')
        localStorage.removeItem('RLS_userName')
        localStorage.removeItem('RLS_userLogin')
        location.href = environment.BASE
        // this._router.navigate([environment.BASE]).then(() => {
        //   window.location.reload();
        // });
      }
    })
  }


}
