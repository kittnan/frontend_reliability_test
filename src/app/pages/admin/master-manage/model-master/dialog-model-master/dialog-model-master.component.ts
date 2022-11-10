import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { OperateGroupService } from 'src/app/http/operate-group.service';

@Component({
  selector: 'app-dialog-model-master',
  templateUrl: './dialog-model-master.component.html',
  styleUrls: ['./dialog-model-master.component.scss']
})
export class DialogModelMasterComponent implements OnInit {

  modelGroup = new FormGroup({
    modelName: new FormControl('', Validators.required),
    modelNo: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    operateGroupCode: new FormControl('', Validators.required),
  })

  operateList: any = []
  constructor(
    private $master: MasterHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $operateGroup: OperateGroupService
  ) { }

  ngOnInit(): void {
    this.getOperateGroup()
    if (this.data) {
      this.modelGroup.patchValue({ ...this.data })
    }
  }
  async getOperateGroup() {
    this.operateList = await this.$operateGroup.get().toPromise()
  }


  onSubmit() {
    const body = this.modelGroup.value;
    this.$master.insertModelMaster(body).subscribe(res => {
      if (res && res.length > 0) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }
  onSave() {
    this.$master.updateModelMaster(this.data._id, this.modelGroup.value).subscribe(res => {
      if (res && res.acknowledged > 0) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }

}
