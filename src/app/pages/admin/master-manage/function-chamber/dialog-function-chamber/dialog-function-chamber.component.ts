import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-function-chamber',
  templateUrl: './dialog-function-chamber.component.html',
  styleUrls: ['./dialog-function-chamber.component.scss']
})
export class DialogFunctionChamberComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<String | null>('', Validators.required),
    value: new FormControl<Number | null>(null, Validators.required)
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private $master: MasterHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      this.form.patchValue({
        ...this.data
      })
    } else {
      const lastRecord = await this.$master.getFunctionChamberLastRecord().toPromise()
      if (lastRecord.length == 0) {
        this.form.patchValue({
          value: 1
        })
      } else {
        const newValue = parseInt(lastRecord[0]?.value) + 1
        this.form.patchValue({
          value: newValue
        })
      }
    }
  }

  onSubmit() {
    this.$master.insertFunctionChamber(this.form.value).subscribe(res => {
      if (res && res.length > 0) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }
  onSave() {
    this.$master.updateFunctionChamber(this.data._id, this.form.value).subscribe(res => {
      if (res && res.acknowledged) {
        this.dialogRef.close(res)
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res, '', 'error')
      }
    })
  }

}
