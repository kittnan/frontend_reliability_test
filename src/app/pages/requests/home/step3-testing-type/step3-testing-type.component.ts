import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { HomeServiceService } from '../home-service.service';


export interface TestingTypeForm {
  group: string,
  [list: string]: any

}

export interface TestingList {
  _id: string,
  name: string,
  checked: boolean,
  description: {
    status: boolean,
    value: string
  }
}

export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-step3-testing-type',
  templateUrl: './step3-testing-type.component.html',
  styleUrls: ['./step3-testing-type.component.scss']
})



export class Step3TestingTypeComponent implements OnInit {

  @ViewChild('inspecTimeInput') inspecTimeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('reportTimeInput') reportTimeInput!: ElementRef<HTMLInputElement>;

  testType: any;
  testListMenu: any;
  testConditionMenu: any = []
  inspectionMenu: any = ['Normal Inspection', 'Special Inspection'];
  operateMenu: any = ['Operate', 'No operate']
  newItemForm = new FormGroup({
    itemNo: new FormControl(1, Validators.required),
    testingType: new FormControl(null, Validators.required),
    testingList: new FormControl(null, Validators.required),
    testingCondition: new FormControl(null, Validators.required),
    operate: new FormControl(null, Validators.required),
    inspection: new FormControl(null, Validators.required),
    inspectionDescription: new FormControl(null, Validators.required),
    sampleNo: new FormControl(null, Validators.required),
    qty: new FormControl(0, [Validators.required, Validators.min(1)]),
    inspectionInterval: new FormControl(<any>[], Validators.required),
    requestReport: new FormControl(<any>[], Validators.required),
  })
  tableDataSource: any[] = []
  testingTypeMenu: TestingTypeForm[] = []
  testingConditionFilter!: Observable<any[]>;

  timeInitialList: any[] = []
  inspectionIntervalCtr = new FormControl('')
  inspectionIntervalFilter!: Observable<any[]>;
  inspectionTime: any[] = ['Initial']

  timeReportList: any[] = [];
  reportTimeFilter!: Observable<any[]>;
  reportTime: any[] = ['Initial']
  reportTimeCtr = new FormControl('')
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  constructor(
    private _loading: NgxUiLoaderService,
    private _homeService: HomeServiceService,
    private _stepper: CdkStepper,
    private route: ActivatedRoute
  ) {
    this.testingConditionFilter = this.newItemForm.controls.testingCondition.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTestingCondition(value || ''))
    )


  }

  ngOnInit(): void {
    this._homeService.getTestingTypeMaster().subscribe(res => this.testingTypeMenu = res)
    this._homeService.getIntervalMaster().subscribe(res => this.timeInitialList = res)
    this._homeService.getIntervalMaster().subscribe(res => this.timeReportList = res)
    this.newItemForm.controls.inspectionInterval.setValue(this.inspectionTime)
    this.newItemForm.controls.requestReport.setValue(this.reportTime)

    setTimeout(() => {
      this.inspectionIntervalFilter = this.inspectionIntervalCtr.valueChanges.pipe(
        startWith(''),
        map(value => this._filterInspecTime(value || ''))
      )
      this.reportTimeFilter = this.reportTimeCtr.valueChanges.pipe(
        startWith(''),
        map(value => this._filterReportTime(value || ''))
      )
    }, 1000);
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      if (id) {
        this.tableDataSource = this._homeService.getFormStep3();
      }
    })

  }


  // TODO FORM ACTION


  onSelect(key: any) {

    if (key == 'type') {
      const testingType: any = this.newItemForm.value.testingType
      this.testListMenu = testingType.list
      this.newItemForm.controls.testingList.setValue(null)
      this.newItemForm.controls.testingCondition.setValue(null)
    }
    if (key == 'list') {
      const testingList: any = this.newItemForm.value.testingList
      this.testConditionMenu = testingList.listItem
      this.newItemForm.controls.testingCondition.setValue(null)
    }

  }

  showDescription() {
    const testingList: any = this.newItemForm.value.testingList
    if (testingList && testingList.description.status) {
      return true
    }
    return false
  }
  symbolCondition(symbol: string) {
    let temp: any = this.newItemForm.value.testingCondition;
    temp += symbol;
    this.newItemForm.patchValue({
      testingCondition: temp
    })
  }

  // TODO >>>testing condition
  _filterTestingCondition(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.testConditionMenu.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }
  // TODO <<<testing condition


  // TODO >>>inspec time
  onAddInspecTime(event: MatChipInputEvent): void {
    const value: any = event.value;
    if (value && !this.inspectionTime.find((item: any) => item == value)) {
      this.inspectionTime.push(value);
      this.newItemForm.controls.inspectionInterval.setValue(this.inspectionTime)
    } else {
      Swal.fire('duplicate value!!', '', 'error')
    }
    event.chipInput!.clear();
    this.inspectionIntervalCtr.setValue(null);
  }

  onRemoveInspecTime(item: string): void {
    const index = this.inspectionTime.indexOf(item);
    if (index >= 0) {
      this.inspectionTime.splice(index, 1);
      this.newItemForm.controls.inspectionInterval.setValue(this.inspectionTime)
    }
  }

  onSelectedInspecTime(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (this.inspectionTime.find((item: any) => item == value)) {
      Swal.fire('duplicate value!!', '', 'error')
    } else {
      this.inspectionTime.push(value);
      this.newItemForm.controls.inspectionInterval.setValue(this.inspectionTime)
    }
    this.inspecTimeInput.nativeElement.value = '';
    this.inspectionIntervalCtr.setValue(null);

  }
  _filterInspecTime(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.timeInitialList.filter(time => time.name.toLowerCase().includes(filterValue));
  }
  // TODO <<<inspec time



  // TODO >>>report time
  onAddReportTime(event: MatChipInputEvent): void {
    const value: any = event.value;
    if (value && !this.reportTime.find((item: any) => item == value)) {
      this.reportTime.push(value);
      this.newItemForm.controls.requestReport.setValue(this.reportTime)
    } else {
      Swal.fire('duplicate value!!', '', 'error')
    }
    event.chipInput!.clear();
    this.reportTimeCtr.setValue(null);
  }

  onRemoveReportTime(item: string): void {
    const index = this.reportTime.indexOf(item);
    if (index >= 0) {
      this.reportTime.splice(index, 1);
      this.newItemForm.controls.requestReport.setValue(this.reportTime)
    }
  }

  onSelectedReportTime(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (this.reportTime.find((item: any) => item == value)) {
      Swal.fire('duplicate value!!', '', 'error')
    } else {
      this.reportTime.push(value);
      this.newItemForm.controls.requestReport.setValue(this.reportTime)
    }
    this.reportTimeInput.nativeElement.value = '';
    this.reportTimeCtr.setValue(null);

  }
  _filterReportTime(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.timeReportList.filter(time => time.name.toLowerCase().includes(filterValue));
  }
  // TODO <<<report time


  validAddBtn() {
    if (this.newItemForm.valid) return false
    return true
  }


  onClickAddNewItem() {
    console.log(this.newItemForm.value);
    this.newItemForm.patchValue({
      itemNo: this.tableDataSource.length + 1
    })
    this.tableDataSource.push(this.newItemForm.value)

  }
  onClickDelete(item: any, i: any) {
    console.log(item);

    Swal.fire({
      title: `Do you want to delete item no.${item.itemNo}?`,
      icon: 'question',
      showCancelButton: true
    }).then(ans => {
      if (ans.isConfirmed) {
        this.delete(item)
      }
    })
  }

  delete(item: any) {
    this._loading.start()
    this.tableDataSource = this.tableDataSource.filter(t => t != item)
    this.tableDataSource = this.tableDataSource.map((value: any, index: number) => {
      value.itemNo = index + 1
      return value
    })
    setTimeout(() => {
      this._loading.stopAll()
      Swal.fire('Success', '', 'success')
    }, 200);
  }

  onNext() {
    this._loading.start();
    if (this.tableDataSource.length > 0) {
      this._homeService.setFormStep3(this.tableDataSource)
      setTimeout(() => {
        this._loading.stopAll();
        this._stepper.next();
      }, 500);
    } else {
      this._loading.stopAll();
      Swal.fire('Form not valid!!', '', 'warning');
    }
  }

}

