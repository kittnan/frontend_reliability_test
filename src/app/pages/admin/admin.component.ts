import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    private router: Router,
  ) {
    this.userLogin = localStorage.getItem('name')
  }

  ngOnDestroy(): void {
  }
  async ngOnInit(): Promise<void> {

  }

}
