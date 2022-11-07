import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperateGroupService } from 'src/app/http/operate-group.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { ToastService } from 'src/app/services/toast.service';


interface GroupForm {
  code: String,
  name: String,
  operate: OperateForm[],
  status: String
}
interface OperateForm {
  checker: OperateItemForm,
  power: OperateItemForm,
  attachment: OperateItemForm
}
interface OperateItemForm {
  code: String,
  qty: Number,
  name: String
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
    operate: [],
    status: ''
  }
  itemList: any = []

  constructor(
    private $operate_items: OperateItemsHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService,
    private $operate_group: OperateGroupService
  ) {
    this.$operate_items.get().subscribe(res => this.itemList = res)
  }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      this.form = this.data

    } else {
      this.genCode()
    }
  }
  async genCode() {
    const resLastCode = await this.$operate_group.getLastRecord().toPromise();
    if (resLastCode.length == 0) {
      this.form.code = 'og-001'
    } else {
      let newCode = resLastCode[0]?.code?.split('-')[1];
      newCode = (Number(newCode) + 1).toString();
      if (newCode.length == 1) newCode = 'og-00' + newCode;
      if (newCode.length == 2) newCode = 'og-0' + newCode;
      this.form.code = newCode;
    }
  }
  addOperate() {
    this.form.operate.push({
      attachment: {
        code: '',
        qty: 0,
        name: ''
      },
      checker: {
        code: '',
        qty: 0,
        name: ''
      },
      power: {
        code: '',
        qty: 0,
        name: ''
      }
    })
  }

  filterItemList(items: any, type: string) {
    return items.filter((item: any) => item.type == type)
  }
  async onAdd() {
    const resInsert = await this.$operate_group.insert(this.form).toPromise()
    if (resInsert.length > 0) {
      this.dialogRef.close(resInsert)
      this._toast_service.success();
    } else {
      this._toast_service.danger('');
    }
  }
  deleteList(index: number) {
    this.form.operate.splice(index, 1)
  }
  async onEdit() {
    console.log(this.form);

    const resUpdate = await this.$operate_group.update(this.data._id, this.form).toPromise()
    if (resUpdate.acknowledged) {
      this.dialogRef.close(resUpdate)
      this._toast_service.success();
    } else {
      this._toast_service.danger('');
    }
  }

  selectOperate(item: OperateForm, action: String) {
    if (action == 'checker') {
      const temp = this.itemList.find((i:any)=> i.code === item.checker.code)
      item.checker = {
        code: item.checker.code,
        name: temp.name,
        qty: 0
      }
    }
    if (action == 'attachment') {
      const temp = this.itemList.find((i:any)=> i.code === item.attachment.code)
      item.attachment = {
        code: item.attachment.code,
        name: temp.name,
        qty: 0
      }
    }
    if (action == 'power') {
      const temp = this.itemList.find((i:any)=> i.code === item.power.code)
      item.power = {
        code: item.power.code,
        name: temp.name,
        qty: 0
      }
    }
  }


}
