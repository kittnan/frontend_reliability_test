import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-department',
  templateUrl: './dialog-department.component.html',
  styleUrls: ['./dialog-department.component.scss']
})
export class DialogDepartmentComponent implements OnInit {

  newMaster: any
  constructor(
    private _master_service: MasterHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService

  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.newMaster = this.data.name
    }
  }

  onSubmit() {
    this._master_service.insertDepartmentMaster({ name: this.newMaster }).subscribe(res => {
      if (res.length > 0) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }
  onSave() {
    this.data.name = this.newMaster
    this._master_service.updateDepartmentMaster(this.data._id, this.data).subscribe(res => {
      if(res.modifiedCount >0){
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      }else{
        Swal.fire(res, '', 'error')
      }
    })
  }
}
