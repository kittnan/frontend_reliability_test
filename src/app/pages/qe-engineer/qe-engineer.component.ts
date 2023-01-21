import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qe-engineer',
  templateUrl: './qe-engineer.component.html',
  styleUrls: ['./qe-engineer.component.scss']
})
export class QeEngineerComponent implements OnInit {

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
