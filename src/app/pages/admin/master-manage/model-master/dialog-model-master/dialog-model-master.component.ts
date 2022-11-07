import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-model-master',
  templateUrl: './dialog-model-master.component.html',
  styleUrls: ['./dialog-model-master.component.scss']
})
export class DialogModelMasterComponent implements OnInit {

  modelGroup = new FormGroup({
    _id: new FormControl(''),
    modelName: new FormControl('', Validators.required),
    modelNo: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
  })
  constructor(
    private _master_service: MasterHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService

  ) { }

  ngOnInit(): void {
    console.log(this.data);

    if (this.data) {
      this.modelGroup.patchValue({
        _id: this.data._id,
        modelName: this.data.modelName,
        modelNo: this.data.modelNo,
        type: this.data.type,
        customer: this.data.customer
      })
    }
  }


  onSubmit() {
    const body = this.modelGroup.value;
    delete body._id
    this._master_service.insertModelMaster(body).subscribe(res => {
      if (res && res.length > 0) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }
  onSave() {
    this.data = { ...this.modelGroup.value }
    this._master_service.updateModelMaster(this.data._id, this.data).subscribe(res => {
      if (res && res.acknowledged > 0) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }

}
