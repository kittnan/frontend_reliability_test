import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  items: any[] = []

  userLogin!:any;
  constructor(
    
    private router: Router
    ) {
    
    this.items = [
      {
        path:'/request',
        icon:'home',
        title:'Home'
      },
      {
        path:'',
        icon:'feed',
        title:'request'
      }
    ],
    this.userLogin = localStorage.getItem('name')
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

  onLogout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
