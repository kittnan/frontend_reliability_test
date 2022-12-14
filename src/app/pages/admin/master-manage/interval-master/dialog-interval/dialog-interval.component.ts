import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-interval',
  templateUrl: './dialog-interval.component.html',
  styleUrls: ['./dialog-interval.component.scss']
})
export class DialogIntervalComponent implements OnInit {


  interval = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  })
  constructor(
    private _master_service: MasterHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService

  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.interval.patchValue({
        ...this.data
      })
    }
  }

  onSubmit() {
    this._master_service.insertIntervalMaster(this.interval.value).subscribe(res => {
      if (res && res.length > 0) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }
  onSave() {
    // this.data = this.interval.value
    this._master_service.updateIntervalMaster(this.data._id, this.interval.value).subscribe(res => {
      if (res && res.acknowledged) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }

}
