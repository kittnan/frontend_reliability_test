import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {
  sideNav: Boolean = false;
  items: any[] = []
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
      this.userLogin = localStorage.getItem('name')

    ]
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

  onLogout() {
    localStorage.clear()
    this.router.navigate(['/'])
  }


}
