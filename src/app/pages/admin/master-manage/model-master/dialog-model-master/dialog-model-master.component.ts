import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    this._master_service.insertModelMaster(this.modelGroup.value).subscribe(res => {
      if (res.length > 0) {
        this.dialogRef.close(res)
        this._toast_service.success();
      } else {
        this._toast_service.danger('')
      }
    })
  }
  onSave() {
    this.data = { ...this.modelGroup.value }
    this._master_service.updateModelMaster(this.data._id, this.data).subscribe(res => {
      if (res.modifiedCount > 0) {
        this.dialogRef.close(res)
        this._toast_service.success();
      } else {
        this._toast_service.danger('');
      }
    })
  }

}
