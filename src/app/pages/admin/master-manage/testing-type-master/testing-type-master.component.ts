import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { DialogTestingTypeComponent } from './dialog-testing-type/dialog-testing-type.component';

@Component({
  selector: 'app-testing-type-master',
  templateUrl: './testing-type-master.component.html',
  styleUrls: ['./testing-type-master.component.scss']
})
export class TestingTypeMasterComponent implements OnInit {


  filteredMaster: any
  masters: any
  constructor(
    private _master_service: MasterHttpService,
    public dialog: MatDialog,
    private _toast_service: ToastService
  ) { }

  ngOnInit(): void {
    this.getMaster();
  }

  getMaster() {
    this._master_service.getTestingTypeMaster().subscribe(res => {
      this.masters = res;
      this.filteredMaster = res;
    })
  }

  onUserFilter(key: any) {
    if (key != '') {
      this.filteredMaster = this.masters.filter((master: any) => {
        if (master.group.toLowerCase().includes(key.toLowerCase())) return true
        if (master.list.filter((list: any) => list.name.toLowerCase().includes(key.toLowerCase())).length > 0) return true
        return false
      }
      )
    } else {
      this.filteredMaster = this.masters
    }
  }

  openDialog() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogTestingTypeComponent, {
      height: '700px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.length > 0) {
        this.getMaster();
      }
    })
  }
  onEdit(item: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogTestingTypeComponent, {
      data: item,
      height: '700px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getMaster();
      }
    })
  }
  onDelete(item: any) {
    Swal.fire({
      title: `Do you want to delete ${item.name}?`,
      icon: 'question',
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this._master_service.deleteTestingTypeMaster(item._id).subscribe(res => {
          if (res.deletedCount > 0) {
            this._toast_service.success();
            this.getMaster();
          } else {
            this._toast_service.danger('')
          }
        })
      }
    })
  }

}
