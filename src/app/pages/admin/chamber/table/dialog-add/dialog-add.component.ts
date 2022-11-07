import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import Swal from 'sweetalert2';
import { DialogAddService } from './dialog-add.service';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {
  functionChamberList: any = []

  functionList = [
    {
      name: 'Low Temperature',
      value: 1
    },
    {
      name: 'High Temperature',
      value: 2
    },
    {
      name: 'High Temperature & Humidity',
      value: 3
    },
    {
      name: 'High Temperature & Humidity & Vibration',
      value: 4
    },
    {
      name: 'High & Low',
      value: 5
    },
    {
      name: 'Heat Shock',
      value: 6
    },
  ]

  statusList = [
    {
      name: 'ready',
      value: true
    },
    {
      name: 'not ready',
      value: false
    }
  ]

  form = new FormGroup({
    code: new FormControl<String | null>('', Validators.required),
    name: new FormControl<String | null>('', Validators.required),
    capacity: new FormControl<Number | null>(0, Validators.required),
    use: new FormControl<Number | null>(0, Validators.required),
    function: new FormControl<String | null>('', Validators.required),
    status: new FormControl<Boolean | null>(true, Validators.required)
  })

  constructor(
    private _dialog: DialogAddService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private $master: MasterHttpService
  ) {

  }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      this.form.patchValue({
        ...this.data
      })
    } else {
      this.form.patchValue({
        code: await this._dialog.getChamberCode(null)
      });
    }
    this.mapRes()
  }
  onSubmit() {
    if (this.data) {
      this.save()
    } else {
      this.create()
    }
  }
  save() {
    this.$master.updateChamberList(this.data._id, this.form.value).subscribe(res => {
      if (res && res.acknowledged) {
        Swal.fire('SUCCESS', '', 'success')
        this.dialogRef.close(res)
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }
  create() {
    this.$master.insertChamberList(this.form.value).subscribe(res => {
      if (res && res.length > 0) {
        Swal.fire('SUCCESS', '', 'success')
        this.dialogRef.close(res)

      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }

  async mapRes() {
    const resData = await this.$master.getFunctionChamber().toPromise()
    this.functionChamberList = resData.map((r: any) => {
      return {
        name: r.name,
        value: r.value
      }
    })
  }

  objectComparisonFunction(option: any, value: any): boolean {
    return option.value === value.value;
  }

}
