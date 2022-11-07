import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { DialogIntervalComponent } from './dialog-interval/dialog-interval.component';

@Component({
  selector: 'app-interval-master',
  templateUrl: './interval-master.component.html',
  styleUrls: ['./interval-master.component.scss']
})
export class IntervalMasterComponent implements OnInit {



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
    this._master_service.getIntervalMaster().subscribe(res => {
      this.masters = res;
      this.filteredMaster = res;
    })
  }

  onUserFilter(key: any) {
    if (key != '') {
      this.filteredMaster = this.masters.filter((master: any) =>
        master.name.toLowerCase().includes(key.toLowerCase()) ||
        master.value.toString().toLowerCase().includes(key.toLowerCase())
      )
    } else {
      this.filteredMaster = this.masters
    }
  }

  openDialog() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogIntervalComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getMaster();
      }
    })
  }
  onEdit(item: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogIntervalComponent, {
      data: item
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
        this._master_service.deleteIntervalMaster(item._id).subscribe(res => {
          if (res.deletedCount > 0) {
            Swal.fire('SUCCESS', '', 'success')
            this.getMaster();
          } else {
            Swal.fire(res, '', 'error')
          }
        })
      }
    })
  }

}
