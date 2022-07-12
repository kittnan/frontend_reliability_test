import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  status: any[] = [
    'ongoing', 'finish'
  ]
  selected_status = 'ongoing'
  requests: any[] = []
  constructor(
    private _request: RequestHttpService,
    private router: Router,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    this._request.getRequest_form().subscribe(res => this.requests = res)
  }
  onClickView(item:any){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: item,
      width:'90%',
      height:'90%'
    })
  }

}
