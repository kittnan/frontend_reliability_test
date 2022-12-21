import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  userLogin!: any;
  @Output() sideNavChange = new EventEmitter<void>();
  constructor(
    private router: Router
  ) {

  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

  onClickSideNav() {
    this.sideNavChange.emit()
  }

  onLogout() {
    sessionStorage.clear();
    sessionStorage.clear()
    this.router.navigate(['/'])
  }


}
