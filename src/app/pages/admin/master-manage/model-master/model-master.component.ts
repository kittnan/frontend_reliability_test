import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { DialogModelMasterComponent } from './dialog-model-master/dialog-model-master.component';
@Component({
  selector: 'app-model-master',
  templateUrl: './model-master.component.html',
  styleUrls: ['./model-master.component.scss']
})
export class ModelMasterComponent implements OnInit {

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
    this._master_service.getModelMaster().subscribe(res => {
      this.masters = res;
      this.filteredMaster = res;
    })
  }

  onUserFilter(key: any) {
    if (key != '') {
      this.filteredMaster = this.masters.filter((master: any) =>
        master.modelName.toLowerCase().includes(key.toLowerCase()) ||
        master.modelNo.toLowerCase().includes(key.toLowerCase()) ||
        master.type.toLowerCase().includes(key.toLowerCase()) ||
        master.customer.toLowerCase().includes(key.toLowerCase()) 
      )
    } else {
      this.filteredMaster = this.masters
    }
  }

  openDialog() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogModelMasterComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.length > 0) {
        this.getMaster();
      }
    })
  }
  onEdit(item: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogModelMasterComponent, {
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
        this._master_service.deleteModelMaster(item._id).subscribe(res => {
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
