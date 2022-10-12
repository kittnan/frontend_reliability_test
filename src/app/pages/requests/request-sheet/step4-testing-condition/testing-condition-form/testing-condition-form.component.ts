import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { DialogConditionComponent } from './dialog-condition/dialog-condition.component';

@Component({
  selector: 'app-testing-condition-form',
  templateUrl: './testing-condition-form.component.html',
  styleUrls: ['./testing-condition-form.component.scss']
})
export class TestingConditionFormComponent implements OnInit {
  panelOpenState = false;
  testingTypeMaster: any
  conditionList: any;
  inputTemp: any = ''
  selectedConditionList: any = []

  formTemp: any;
  formHeatShock: any
  formVibration: any;
  constructor(
    private _master: MasterHttpService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getMaster()
  }

  getMaster() {
    this._master.getTestingConditionMaster().subscribe(res => {
      console.log(res);
      this.testingTypeMaster = res
    })
  }

  openDialogCondition() {
    const dialogRef = this.dialog.open(DialogConditionComponent, {
      data: '',
      width: '90%',
      height: '90%'
    })
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

    })
  }

  symbolCondition(symbol: string) {
    this.inputTemp += symbol;
  }

  foo() {
    console.log(this.formTemp);
    console.log(this.formHeatShock);
    console.log(this.formVibration);

  }



}
