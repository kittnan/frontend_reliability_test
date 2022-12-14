import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dialog-testing-type',
  templateUrl: './dialog-testing-type.component.html',
  styleUrls: ['./dialog-testing-type.component.scss']
})
export class DialogTestingTypeComponent implements OnInit {


  TestingTypeForm = new FormGroup({
    _id: new FormControl(''),
    group: new FormControl('', Validators.required),
    list: new FormArray([
      this.initListItem()
    ])
  })

  constructor(
    private _master_service: MasterHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.TestingTypeForm.patchValue({
        _id: this.data._id,
        group: this.data.group,
        list: this.setFormGroup(this.data.list)
      })
    }
  }
  setFormGroup(list: any) {
    if(list){
      let c1 = this.TestingTypeForm.get('list') as FormArray;
      list.map((l: any, index: number) => {
        if (index + 1 < list.length) {
          c1.push(this.initListItem())
        }
        // if (l && l.listItem.length > 0) {

        //   const newListItem = l.listItem.map((item: any, index2: number) => {
        //     if (index2 + 1 < l.listItem.length) {
        //       let listArrayForm = this.TestingTypeForm.get('list')?.get([index]) as FormArray;
        //       let listItemArrayForm = listArrayForm.get('listItem') as FormArray;
        //       listItemArrayForm.push(this.initOption())
        //     }
        //     return item
        //   })

        //   list.listItem = newListItem
        // }
      })
      return list
    }else{
      return []
    }


  }
  initListItem() {
    return new FormGroup({
      name: new FormControl(''),
      checked: new FormControl(false),
      description: new FormGroup({
        status: new FormControl(false),
        value: new FormControl('')
      }),
      listItem: new FormArray([
        this.initOption()
      ])
    })
  }
  initOption() {
    return new FormGroup({
      name: new FormControl('')
    })
  }

  getList() {
    let c1 = this.TestingTypeForm.get('list') as FormArray;
    let c2 = c1.controls
    return c2
  }


  onAddList() {
    let listArrayForm = this.TestingTypeForm.get('list') as FormArray;
    listArrayForm.push(this.initListItem())
  }

  deleteList(index: number) {
    let list = this.TestingTypeForm.get(['list']) as FormArray;
    list.removeAt(index);
  }

  onAddListItem(index: number) {
    let listArrayForm = this.TestingTypeForm.get('list')?.get([index]) as FormArray;
    let listItemArrayForm = listArrayForm.get('listItem') as FormArray;
    listItemArrayForm.push(this.initOption())
  }

  deleteListItem(index: number, index2: number) {
    let temp = this.TestingTypeForm.get(['list', index, 'listItem']) as FormArray
    temp.removeAt(index2)
  }

  getListItem(index: number) {
    let c1 = this.TestingTypeForm.get('list')?.get([index]) as FormArray;
    let c2 = c1.get('listItem') as FormArray;
    return c2
  }

  save() {

    this.data = { ...this.TestingTypeForm.value }
    this._master_service.updateTestingTypeMaster(this.data._id, this.data).subscribe(res => {
      if (res.modifiedCount > 0) {
        this.dialogRef.close(res)
        this._toast_service.success();
      } else {
        this._toast_service.danger('');
      }
    })
  }

  submit() {
    let temp = this.TestingTypeForm.value
    delete temp._id
    this._master_service.insertTestingTypeMaster(temp).subscribe(res => {
      if (res.length > 0) {
        this.dialogRef.close(res)
        this._toast_service.success();
      } else {
        this._toast_service.danger('');
      }
    })

  }

}
