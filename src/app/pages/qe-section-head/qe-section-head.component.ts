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
