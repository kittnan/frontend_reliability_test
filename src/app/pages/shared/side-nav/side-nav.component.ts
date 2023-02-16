import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() sideNav: boolean = false;
  @Output() sideNavChange = new EventEmitter<boolean>();
  foo: boolean = false
  items: any[] = [];
  userLogin!: any;
  constructor(
    private router: Router
  ) {
    this.items = [
      {
        path: '',
        icon: 'home',
        title: 'manage',
      },
      this.userLogin = localStorage.getItem('RLS_userName')

    ]
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.foo = this.sideNav
  }

  onLogout() {
    localStorage.removeItem('RLS_token')
    localStorage.removeItem('RLS_id')
    localStorage.removeItem('RLS_authorize')
    localStorage.removeItem('RLS_userName')
    localStorage.removeItem('RLS_userLogin')
    this.router.navigate(['/'])
  }
  onClickLink() {
  }


}
