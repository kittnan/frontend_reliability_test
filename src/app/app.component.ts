import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { DialogAuthComponent } from './pages/shared/dialog-auth/dialog-auth.component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reliability';

  // mobileQuery: MediaQueryList;
  // private _mobileQueryListener: () => void;

  sideItems: any;
  userLogin: any = '';
  authorize: any;
  loginStatus: Boolean = false;
  constructor(
    private _loading: NgxUiLoaderService,
    private dialog: MatDialog,
    private _toast: ToastService,
    private _router: Router,
    private translate: TranslateService
  ) {
    this.userLogin = localStorage.getItem('RLS_userName');
    this.authorize = localStorage.getItem('RLS_authorize');

    translate.addLangs(['en', 'th']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    // if (this.swUpdate.isEnabled) {
    //   this.swUpdate.available.subscribe(() => {
    //     if (confirm("New version available. Load New Version?")) {
    //       window.location.reload();
    //     }
    //   });
    // }
    this.loginValid();
    this.onAccess();
    setTimeout(() => {
      // console.log(this.swUpdate);
    }, 1000);
  }

  ngOnDestroy(): void {
    // this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterContentChecked() {
    // this.changeDetectorRef.detectChanges();
  }

  bgLogin() {
    const locationUrl = this._router.url;
    if (locationUrl.includes('login')) return 'bg-login';
    return '';
  }

  onClickChangeAccess() {
    let userLogin: any = localStorage.getItem('RLS_userLogin');
    userLogin = JSON.parse(userLogin);
    let auth = userLogin.authorize.sort();
    const dialogRef = this.dialog.open(DialogAuthComponent, {
      data: auth,
      hasBackdrop: true,
      position: {
        right: '0',
        top: '0',
      },
      width: '30%',
      height: 'auto',
    });
    let newAuth: any = null;
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        newAuth = res;
        this.setAuth(userLogin, newAuth);
      }
    });
  }

  onClickChangeSection() {
    let userLogin: any = localStorage.getItem('RLS_userLogin');
    userLogin = JSON.parse(userLogin);
    let sections = userLogin.section.sort();
    const dialogRef = this.dialog.open(DialogAuthComponent, {
      data: sections,
      hasBackdrop: true,
      position: {
        right: '0',
        top: '0',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        localStorage.setItem('RLS_section', res);
        location.reload();
      }
    });
  }

  private setAuth(user: any, newAuth: any) {
    this.setToken();
    localStorage.setItem('RLS_authorize', newAuth);
    this._toast.success();
    setTimeout(() => {
      this._loading.start();
      if (newAuth == 'qe_engineer') {
        this._router.navigate(['qe-engineer'])
      } else
        if (newAuth == 'qe_window_person') {
          this._router.navigate(['qe-window-person'])
        } else {
          location.reload();
        }
    }, 1000);
  }

  private setToken() {
    const token = uuid();
    localStorage.setItem('RLS_token', token);
  }

  loginValid() {
    const token = localStorage.getItem('RLS_token');
    if (token) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }
  }

  htmlShowAuthLogin() {
    let str: any = '';
    switch (localStorage.getItem('RLS_authorize')) {
      case 'qe_section_head':
        str = 'qc_dept_head';
        break;
      case 'qe_engineer2':
        str = 'qe_sec_head';
        break;
      default:
        str = localStorage.getItem('RLS_authorize');
        break;
    }
    return str;
  }
  htmlShowSectionLogin() {
    if (!localStorage.getItem('RLS_section')) this.onLogout();
    return localStorage.getItem('RLS_section');
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
              title: 'main',
            },
            {
              path: '/dashboard-gantt-equipment',
              icon: 'poll',
              title: 'equipment',
            },
          ],
        },
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/admin/request-manage',
              icon: 'feed',
              title: 'manage',
            },
          ],
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
              title: 'department',
            },
            {
              path: '/admin/section',
              icon: 'group',
              title: 'section',
            },
            {
              path: '/admin/authorize',
              icon: 'verified_user',
              title: 'authorize',
            },
            {
              path: '/admin/model',
              icon: 'change_history',
              title: 'model',
            },
            {
              path: '/admin/test-purpose',
              icon: 'bug_report',
              title: 'test-purpose',
            },
            {
              path: '/admin/testing-type',
              icon: 'bug_report',
              title: 'testing-type',
            },
            {
              path: '/admin/functional-chamber',
              icon: 'api',
              title: 'functional-chamber',
            },
            {
              path: '/admin/report',
              icon: 'article',
              title: 'report excel',
            },
            {
              path: '/admin/model-condition',
              icon: 'settings',
              title: 'model-condition',
            },
          ],
        },
        {
          title: 'chamber',
          icon: 'all_inbox',
          items: [
            {
              path: '/admin/chamber',
              icon: 'settings',
              title: 'manage',
            },
          ],
        },
        // {
        //   title: 'operate',
        //   icon: 'hardware',
        //   items: [
        //     {
        //       path: '/admin/operate-group',
        //       icon: 'home_repair_service',
        //       title: 'group',
        //     },
        //     {
        //       path: '/admin/operate-items',
        //       icon: 'hardware',
        //       title: 'items',
        //     },
        //     {
        //       path: '/admin/equipment',
        //       icon: 'hardware',
        //       title: 'equipments',
        //     },
        //   ],
        // },
        {
          title: 'approver',
          icon: 'diversity_3',
          items: [
            {
              path: '/admin/approver',
              icon: 'group',
              title: 'manage',
            },
          ],
        },
        // {
        //   title: 'qr code',
        //   icon: 'qr_code_scanner',
        //   items: [
        //     // {
        //     //   path: '/admin/qr-code-chamber',
        //     //   icon: 'qr_code_2',
        //     //   title: 'chamber',
        //     // },
        //     {
        //       path: '/admin/qr-code-operate',
        //       icon: 'qr_code_2',
        //       title: 'operate',
        //     },
        //   ],
        // },

        {
          title: 'equipment',
          icon: 'hardware',
          items: [
            {
              path: '/admin/equipment2',
              icon: 'settings',
              title: 'manage',
            },
            {
              path: '/qe-technical/equipment-control',
              icon: 'settings_input_component',
              title: 'monitor',
            },
          ],
        },
      ];
    }
    if (this.authorize == 'request') {
      this.sideItems = [
        // {
        //   title: 'dashboard',
        //   icon: 'dashboard',
        //   items: [
        //     {
        //       path: '/dashboard',
        //       icon: 'dashboard',
        //       title: 'main'
        //     },

        //   ]
        // },
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/request/sheet',
              icon: 'post_add',
              title: 'new',
            },
            {
              path: '/request/manage',
              icon: 'feed',
              title: 'manage',
            },
            {
              path: '/request/revises-table',
              icon: 'feed',
              title: 'revises-plan',
            },
          ],
        },
      ];
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
              title: 'main',
            },
            {
              path: '/dashboard-gantt-equipment',
              icon: 'poll',
              title: 'equipment',
            },
          ],
        },
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/approve',
              icon: 'home',
              title: 'manage',
            },
            {
              path: '/approve/revises-table',
              icon: 'feed',
              title: 'revises-plan',
            },
          ],
        },
      ];
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
              title: 'main',
            },
            {
              path: '/dashboard-gantt-equipment',
              icon: 'poll',
              title: 'equipment',
            },
          ],
        },
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/qe-window-person',
              icon: 'home',
              title: 'manage',
            },
            {
              path: '/qe-window-person/revises-table',
              icon: 'feed',
              title: 'revises-plan',
            },
          ],
        },
        {
          title: 'equipment',
          icon: 'hardware',
          items: [
            {
              path: '/qe-technical/equipment-control',
              icon: 'settings_input_component',
              title: 'monitor',
            },
          ],
        },
      ];
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
              title: 'main',
            },
            {
              path: '/dashboard-gantt-equipment',
              icon: 'poll',
              title: 'equipment',
            },
          ],
        },
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/qe-engineer',
              icon: 'home',
              title: 'manage',
            },
            {
              path: '/qe-engineer/revises-table',
              icon: 'feed',
              title: 'revises-plan',
            },
          ],
        },
        {
          title: 'equipment',
          icon: 'hardware',
          items: [
            {
              path: '/qe-technical/equipment-control',
              icon: 'settings_input_component',
              title: 'monitor',
            },
          ],
        },
      ];
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
              title: 'main',
            },
            {
              path: '/dashboard-gantt-equipment',
              icon: 'poll',
              title: 'equipment',
            },
          ],
        },
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/qe-section-head',
              icon: 'home',
              title: 'manage',
            },
            {
              path: '/qe-section-head/revises-table',
              icon: 'feed',
              title: 'revises-plan',
            },
          ],
        },
        {
          title: 'equipment',
          icon: 'hardware',
          items: [
            {
              path: '/qe-technical/equipment-control',
              icon: 'settings_input_component',
              title: 'monitor',
            },
          ],
        },
      ];
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
            },
          ],
        },
        {
          title: 'equipment',
          icon: 'hardware',
          items: [
            {
              path: '/qe-technical/equipment-control',
              icon: 'settings_input_component',
              title: 'monitor',
            },
          ],
        },
      ];
    }
    if (this.authorize == 'guest') {
      this.sideItems = [
        {
          title: 'guest',
          icon: 'feed',
          items: [
            {
              path: '/guest',
              icon: 'home',
              title: 'manage',
            },
          ],
        },
      ];
    }

    if (this.authorize == 'qe_technical') {
      this.sideItems = [
        {
          title: 'dashboard',
          icon: 'dashboard',
          items: [
            {
              path: '/dashboard',
              icon: 'dashboard',
              title: 'main',
            },
            {
              path: '/dashboard-gantt-equipment',
              icon: 'poll',
              title: 'equipment',
            },
          ],
        },
        {
          title: 'request',
          icon: 'feed',
          items: [
            {
              path: '/qe-technical/manage',
              icon: 'feed',
              title: 'manage',
            },
          ],
        },
        {
          title: 'equipment',
          icon: 'hardware',
          items: [
            {
              path: '/qe-technical/equipment-control',
              icon: 'settings_input_component',
              title: 'monitor',
            },
          ],
        },

      ];
    }
  }

  onLogout() {
    this._loading.start();
    localStorage.removeItem('RLS_token');
    localStorage.removeItem('RLS_id');
    localStorage.removeItem('RLS_authorize');
    localStorage.removeItem('RLS_userName');
    localStorage.removeItem('RLS_userLogin');
    localStorage.removeItem('RLS_section');
    // localStorage.removeItem('RLS_version')
    this.loginStatus = false;
    this._router.navigate(['']).then(() => {
      window.location.reload();
    });

    // window.location.href = 'http://10.200.90.152:8081/reliability/login'
    // Swal.fire({
    //   title: `Do you want to logout?`,
    //   icon: 'question',
    //   showCancelButton: true
    // }).then((value: SweetAlertResult) => {
    //   if (value.isConfirmed) {
    //     // location.href = environment.BASE
    //     // this._router.navigate([environment.BASE]).then(() => {
    //     //   window.location.reload();
    //     // });
    //   }
    // })
  }
}
