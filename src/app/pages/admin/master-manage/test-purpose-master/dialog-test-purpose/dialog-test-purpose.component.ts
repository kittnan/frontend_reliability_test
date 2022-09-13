import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dialog-test-purpose',
  templateUrl: './dialog-test-purpose.component.html',
  styleUrls: ['./dialog-test-purpose.component.scss']
})
export class DialogTestPurposeComponent implements OnInit {

  name = new FormControl('',Validators.required)
  description = new FormControl(false,Validators.required)

  TestPurposeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    checked: new FormControl(false),
    description: new FormGroup({
      status: new FormControl(false),
      value: new FormControl(''),
    }),
  })
  constructor(
    private _master_service: MasterHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService
  ) { }

  ngOnInit(): void {
    console.log(this.TestPurposeForm.value);
    if(this.data){
      this.name.setValue(this.data.name);
      this.description.setValue(this.data['description'].status)
    }
  }

  
  onSubmit() {
    this.TestPurposeForm.patchValue({
      name:this.name.value,
      description:{
        status: this.description.value
      }
    })
    this._master_service.insertTestPurposeMaster(this.TestPurposeForm.value).subscribe(res => {
      if (res.length > 0) {
        this.dialogRef.close(res)
        this._toast_service.success();
      } else {
        this._toast_service.danger('')
      }
    })
  }
  onSave() {
    this.TestPurposeForm.patchValue({
      name:this.name.value,
      description:{
        status: this.description.value
      }
    })
    const body = {
      ...this.TestPurposeForm.value,
      _id:this.data._id
    }
    this._master_service.updateTestPurposeMaster(body._id, body).subscribe(res => {
      if (res.modifiedCount > 0) {
        this.dialogRef.close(res)
        this._toast_service.success();
      } else {
        this._toast_service.danger('');
      }
    })
  }

}
