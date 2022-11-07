import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrls: ['./items-dialog.component.scss']
})
export class ItemsDialogComponent implements OnInit {

  form = new FormGroup({
    code: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    qty: new FormControl('', Validators.required),
    qtyNon: new FormControl(0, Validators.required),
    status: new FormControl('ready', Validators.required),
  })
  typeList: any = []

  constructor(
    private _operate_items: OperateItemsHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService
  ) {
    this.typeList = [
      {
        name: 'checker',
        value: 'checker'
      },
      {
        name: 'DC power',
        value: 'power'
      },
      {
        name: 'attachment',
        value: 'attachment'
      }
    ]
  }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      this.form.patchValue({
        ...this.data
      })
    } else {
      this.genCode()
    }
  }
  async genCode() {
    const resLastCode = await this._operate_items.getLastRecord().toPromise()
    if (resLastCode.length == 0) {
      this.form.patchValue({
        code: 'ot-001',
      })
    } else {
      let newCode = resLastCode[0]?.code?.split('-')[1];
      newCode = (Number(newCode) + 1).toString();
      if (newCode.length == 1) newCode = 'ot-00' + newCode;
      if (newCode.length == 2) newCode = 'ot-0' + newCode;
      this.form.patchValue({
        code: newCode,
      })
    }
  }
  async onAdd() {
    const resAdd = await this._operate_items.insert(this.form.value).toPromise()
    if (resAdd.length > 0) {
      this.dialogRef.close(resAdd)
      this._toast_service.success();
    } else {
      this._toast_service.danger('');
    }
  }
  async onEdit() {
    const resAdd = await this._operate_items.update(this.data._id,this.form.value).toPromise()
    if (resAdd.acknowledged) {
      this.dialogRef.close(resAdd)
      this._toast_service.success();
    } else {
      this._toast_service.danger('');
    }
  }

}
