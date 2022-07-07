import { M } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { AuthorizeForm } from 'src/app/interface/authorize_master';

@Component({
  selector: 'app-authorize-master',
  templateUrl: './authorize-master.component.html',
  styleUrls: ['./authorize-master.component.scss']
})
export class AuthorizeMasterComponent implements OnInit {

  masters!: AuthorizeForm[]
  filteredMaster!: AuthorizeForm[]
  constructor(
    private _master_service: MasterHttpService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this._master_service.getAuthorizeMaster().subscribe(res => {
      this.masters = res
      this.filteredMaster = res
    })

  }
  onUserFilter(key: any) {
    if (key != '') {
      this.filteredMaster = this.masters.filter((master: any) =>
        master.name.toLowerCase().includes(key.toLowerCase())
      )
    }else{
      this.filteredMaster = this.masters
    }
  }
  openDialog(){
    this.dialog.open(DialogAuthorizeMasterAdd)
  }
}



@Component({
  selector: 'dialog-authorize-master-add',
  templateUrl: 'dialog-authorize-master-add.html',
})
export class DialogAuthorizeMasterAdd {}