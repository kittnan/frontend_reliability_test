import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-section',
  templateUrl: './dialog-section.component.html',
  styleUrls: ['./dialog-section.component.scss']
})
export class DialogSectionComponent implements OnInit {
  newMaster: any
  constructor(
    private _master_service: MasterHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService

  ) { }

  ngOnInit(): void {
    console.log(this.data);

    if (this.data) {
      this.newMaster = this.data.name
    }
  }

  onSubmit() {
    this._master_service.insertSectionMaster({ name: this.newMaster }).subscribe(res => {
      if (res && res.length > 0) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }
  onSave() {
    this.data.name = this.newMaster
    this._master_service.updateSectionMaster(this.data._id, this.data).subscribe(res => {
      if(res && res.acknowledged){
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      }else{
        Swal.fire(res, '', 'error')
      }
    })
  }

}
