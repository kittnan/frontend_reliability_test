import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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

  @Input() testingType: any
  @Output() testingTypeChange = new EventEmitter<any>()


  testType: any;
  testListMenu: any;
  testConditionMenu: any;
  inspectionMenu: any = ['Normal Inspection', 'Special Inspection'];
  operateMenu: any = ['Operate', 'No operate']
  newItemForm = new FormGroup({
    itemNo: new FormControl(1, Validators.required),
    testingType: new FormControl(null, Validators.required),
    testingList: new FormControl(null, Validators.required),
    testingCondition: new FormControl(null),
    operate: new FormControl(null, Validators.required),
    inspection: new FormControl(null, Validators.required),
    inspectionDescription: new FormControl(null, Validators.required),
    sampleNo: new FormControl(null, Validators.required),
    qty: new FormControl(null, Validators.required),
    inspectionInterval: new FormControl([], Validators.required),
    requestReport: new FormControl([], Validators.required),
  })


  // timeInitial = new FormControl('',Validators.required);
  timeInitialList:any[] =[]

  // requestReport = new FormControl('',Validators.required);
  requestReportList = ['Initial', '100hr', '200hr']

  tableDataSource: any[] = []

  testingTypeMenu: TestingTypeForm[] = []
  constructor(
    private _loading: NgxUiLoaderService,
    private _homeService: HomeServiceService
  ) {

  }

  ngOnInit(): void {
    this._homeService.getTestingTypeMaster().subscribe(res => this.testingTypeMenu = res)
    this._homeService.getIntervalMaster().subscribe(res => this.timeInitialList = res)
  }


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

  showSelectInterval(item:any){
    const temp = item
    return temp?.map((t:any)=>t.name)
  }
  showSelectReportList(item:any){
    const temp = item
    return temp?.map((t:any)=>t.name)
  }

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
      title: 'Do you want to delete?',
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
    }, 500);
  }

  onNext() {
    this.testingType = this.tableDataSource
    this.testingTypeChange.emit(this.testingType)
    this._homeService.setFormStep3(this.tableDataSource)
  }

}

