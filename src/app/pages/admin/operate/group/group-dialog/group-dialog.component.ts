import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { ToastService } from 'src/app/services/toast.service';


interface GroupForm {
  code: String,
  name: String,
  operate: OperateForm[],
}
interface OperateForm {
  checker: OperateItemForm,
  power: OperateItemForm,
  attachment: OperateItemForm
}
interface OperateItemForm {
  code: String,
  qty: Number
}

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {


  // form = new FormGroup({
  //   code: new FormControl('', Validators.required),
  //   name: new FormControl('', Validators.required),
  //   operate: new FormGroup({
  //     checker: new FormControl(),
  //     power: new FormControl(),
  //     attachment: new FormControl()
  //   }),
  //   status: new FormControl('ready', Validators.required),
  // })
  form: GroupForm = {
    code: '',
    name: '',
    operate: []
  }
  itemList: any = []

  constructor(
    private _operate_items: OperateItemsHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService
  ) {
    this._operate_items.get().subscribe(res => this.itemList = res)
  }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      this.form = this.data

    } else {
      this.genCode()
    }
  }
  async genCode() {
    const resLastCode = await this._operate_items.getLastRecord().toPromise()
    if (resLastCode.length == 0) {

    } else {
      let newCode = resLastCode[0]?.code?.split('-')[1];
      newCode = (Number(newCode) + 1).toString();
      if (newCode.length == 1) newCode = 'ot-00' + newCode;
      if (newCode.length == 2) newCode = 'ot-0' + newCode;

    }
  }
  addOperate() {
    this.form.operate.push({
      attachment: {
        code: '',
        qty: 0
      },
      checker: {
        code: '',
        qty: 0
      },
      power: {
        code: '',
        qty: 0
      }
    })
  }
  async onAdd() {
    // const resAdd = await this._operate_items.insert(this.form.value).toPromise()
    // if (resAdd.length > 0) {
    //   this.dialogRef.close(resAdd)
    //   this._toast_service.success();
    // } else {
    //   this._toast_service.danger('');
    // }
  }
  async onEdit() {
    // const resAdd = await this._operate_items.update(this.data._id, this.form.value).toPromise()
    // if (resAdd.acknowledged) {
    //   this.dialogRef.close(resAdd)
    //   this._toast_service.success();
    // } else {
    //   this._toast_service.danger('');
    // }
  }

}
