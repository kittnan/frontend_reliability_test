import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qe-section-head',
  templateUrl: './qe-section-head.component.html',
  styleUrls: ['./qe-section-head.component.scss']
})
export class QeSectionHeadComponent implements OnInit {


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
      this.userLogin = localStorage.getItem('RLS_userName')

    ]
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('RLS_token')
    localStorage.removeItem('RLS_id')
    localStorage.removeItem('RLS_authorize')
    localStorage.removeItem('RLS_userName')
    localStorage.removeItem('RLS_userLogin')
    this.router.navigate(['/'])
  }

}
