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
  
  panelOpenState = false;
  constructor(
    
    private router: Router
    ) {
    
    this.items = [
      {
        path:'/request/home',
        icon:'post_add',
        title:'new request'
      },
      {
        path:'/request/manage',
        icon:'feed',
        title:'request manage'
      },
      {
        path:'/request/request-sheet',
        icon:'post_add',
        title:'new request'
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
