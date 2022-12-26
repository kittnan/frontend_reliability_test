import { HttpParams } from '@angular/common/http';
import { Step3HttpService } from './../../../../../http/step3-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterHttpService } from 'src/app/http/master-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { RequestSheetService } from '../../request-sheet.service';
import { SetSubjectService } from '../../set-subject.service';

interface testingTypeMenuForm {
  data: dataForm[],
  requestId: String | null,
  _id?: String
}
interface dataForm {
  checked: boolean,
  groupName: String,
  list: listForm[]
}
interface listForm {
  checked: boolean,
  name: String
}
@Component({
  selector: 'app-sheet-step3',
  templateUrl: './sheet-step3.component.html',
  styleUrls: ['./sheet-step3.component.css']
})
export class SheetStep3Component implements OnInit {
  @Input() formId: any
  testingTypeMenu: any = {
    data: [],
    requestId: null
  }
  constructor(
    private _loading: NgxUiLoaderService,
    private _stepper: CdkStepper,
    private route: ActivatedRoute,
    private $master: MasterHttpService,
    private _requestSheet: RequestSheetService,
    private $step3: Step3HttpService
  ) { }

  async ngOnInit() {
    const resTestingType = await this.$master.getTestingTypeMaster().toPromise();
    const resultMap: any = await this._requestSheet.setTestingTypeList(resTestingType)
    this.testingTypeMenu = {
      requestId: this.formId,
      data: resultMap
    };
    if(this.formId){
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      const resGet: any = await this.$step3.get(params).toPromise()
      if (resGet && resGet.length > 0) {
        this.testingTypeMenu = {
          ...resGet[0]
        }
    }

    }
  }

  onNext() {
    Swal.fire({
      title: `Do you want to save draft?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
        if (this.testingTypeMenu._id) {
          this.update()
        } else {
          this.insert()
        }
      }
    })
  }

  async update() {
    this.testingTypeMenu.requestId = this.formId
    const resUpdate = await this.$step3.update(this.testingTypeMenu._id, this.testingTypeMenu).toPromise()
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  async insert() {
    this.testingTypeMenu.requestId = this.formId
    const resInsert = await this.$step3.insert(this.testingTypeMenu).toPromise()
    setTimeout(() => {
      this.testingTypeMenu._id = resInsert[0]._id
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  onBack() {
    this._stepper.previous()
  }

}
