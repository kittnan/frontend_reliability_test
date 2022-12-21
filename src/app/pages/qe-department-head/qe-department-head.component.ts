import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qe-department-head',
  templateUrl: './qe-department-head.component.html',
  styleUrls: ['./qe-department-head.component.scss']
})
export class QeDepartmentHeadComponent implements OnInit {


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
      this.userLogin = sessionStorage.getItem('name')

    ]
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

  onLogout() {
    sessionStorage.clear()
    this.router.navigate(['/'])
  }

}
