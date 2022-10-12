import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dialog-testing-condition',
  templateUrl: './dialog-testing-condition.component.html',
  styleUrls: ['./dialog-testing-condition.component.scss']
})
export class DialogTestingConditionComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  testingCondition: any = {
    name: '',
    list: []
  }
  constructor(
    private _master_service: MasterHttpService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast_service: ToastService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.testingCondition = this.data;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.testingCondition.list.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  remove(item: any): void {
    const index = this.testingCondition.list.indexOf(item);

    if (index >= 0) {
      this.testingCondition.list.splice(index, 1);
    }
  }
  onSubmit() {
    if (this.testingCondition._id) {
      this.update(this.testingCondition._id, this.testingCondition)
    } else {
      this.insert(this.testingCondition)
    }

  }
  insert(data: any) {
    this._master_service.insertTestingConditionMaster(data).subscribe
      ((res: any) => {
        if (res.length > 0) {
          this.dialogRef.close(res)
          this._toast_service.success()
        } else {
          this._toast_service.danger('');
        }
      })
  }

  update(id: any, data: any) {
    this._master_service.updateTestingConditionMaster(id, data).subscribe(res => {
      if (res.acknowledged) {
        this._toast_service.success()
        this.dialogRef.close(res)
      } else {
        this._toast_service.danger('');
      }

    })
  }
}
