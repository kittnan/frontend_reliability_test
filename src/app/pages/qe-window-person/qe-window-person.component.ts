import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qe-window-person',
  templateUrl: './qe-window-person.component.html',
  styleUrls: ['./qe-window-person.component.scss']
})
export class QeWindowPersonComponent implements OnInit {
  items: any[] = []
  userLogin:any
  constructor(
    private router: Router
  ) { 
    this.items = [
      {
        path:'manage',
        icon:'manage_accounts',
        title:'manage'
      },
   
    ],
    this.userLogin = localStorage.getItem('name')

  }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/'])
  }

}
