import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: any[] = []

  userLogin:any
  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private router: Router,
    ) {
    this.items = [
      {
        path:'/admin',
        icon:'manage_accounts',
        title:'Users Manage'
      },
      {
        path:'/admin/master-manage',
        icon:'view_list',
        title:'Master'
      },
    ],
    this.userLogin = localStorage.getItem('name')
  }

  ngOnDestroy(): void {
  }
  async ngOnInit(): Promise<void> {
    
  }

  onLogout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
