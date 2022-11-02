import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: any[] = []
  sideItems: any[] = []

  userLogin: any
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
  ) {

    this.sideItems = [
      {
        title: 'master',
        icon: 'manage_accounts',
        items: [
          {
            path: '/admin',
            icon: 'manage_accounts',
            title: 'Users Manage',
          },
          {
            path: '/admin/master-manage',
            icon: 'view_list',
            title: 'Master'
          },

        ]
      },
      {
        title: 'chamber',
        icon: 'manage_accounts',
        items: [

          {
            path: '/admin/chamber-add',
            icon: 'view_list',
            title: 'Chamber'
          },
        ]
      },
      {
        title: 'operate',
        icon: 'manage_accounts',
        items: [

          {
            path: '/admin/operate-group',
            icon: 'view_list',
            title: 'group'
          },
          {
            path: '/admin/operate-items',
            icon: 'view_list',
            title: 'items'
          },
        ]
      }
    ]

    this.items = [
      {
        path: '/admin',
        icon: 'manage_accounts',
        title: 'Users Manage',
      },
      {
        path: '/admin/master-manage',
        icon: 'view_list',
        title: 'Master'
      },
      {
        path: '/admin/chamber',
        icon: 'view_list',
        title: 'Chamber'
      },
    ],
      this.userLogin = localStorage.getItem('name')
  }

  ngOnDestroy(): void {
  }
  async ngOnInit(): Promise<void> {

  }

  onLogout() {
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
