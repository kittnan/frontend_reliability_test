import { Step4HttpService } from './../../../../../http/step4-http.service';
import { HttpParams } from '@angular/common/http';
import { Step3HttpService } from './../../../../../http/step3-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterHttpService } from 'src/app/http/master-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { RequestSheetService } from '../../../sheet/request-sheet.service';

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
  selector: 'app-sheet3-step3',
  templateUrl: './sheet3-step3.component.html',
  styleUrls: ['./sheet3-step3.component.scss']
})
export class Sheet3Step3Component implements OnInit {
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
    private $step3: Step3HttpService,
    private $step4: Step4HttpService
  ) {
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.formId = params.id
      }
    })
  }

  async ngOnInit() {
    const resTestingType = await this.$master.getTestingTypeMaster().toPromise();
    const resultMap: any = await this._requestSheet.setTestingTypeList(resTestingType)
    this.testingTypeMenu = {
      requestId: this.formId,
      data: resultMap
    };
    if (this.formId) {
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      const resGet: any = await this.$step3.get(params).toPromise()
      if (resGet && resGet.length > 0) {
        const step3 = resGet[0]
        const step3Data = step3.data
        const masterData = this.testingTypeMenu.data

        const resultMerge = masterData.map((masData: any) => {
          const masGroup = masData
          const step3Group = step3Data.find((s: any) => s.groupName == masGroup.groupName)

          const listMas = masGroup.list
          const listStep3 = step3Group.list

          const newList = listMas.map((l1: any) => {
            const itemInListStep3 = listStep3.find((l2: any) => l2.name == l1.name)
            return {
              ...l1,
              ...itemInListStep3
            }
          })

          return {
            ...masGroup,
            ...step3Group,
            list: newList
          }

        })
        this.testingTypeMenu = {
          ...step3,
          data: resultMerge
        }
        // this.testingTypeMenu = resGet[0]
      }

    }
  }

  filterOven() {
    const res = this.testingTypeMenu.data.filter((d: any) => d.type == 'oven')
    return res
  }
  filterNoOven() {
    const res = this.testingTypeMenu.data.filter((d: any) => d.type == 'noOven' || d.type == 'mix')
    return res
  }
  onCheckAll2(key: any) {
    const check = key.checked
    const res = this.testingTypeMenu.data.filter((d: any) => d.type == 'noOven' || d.type == 'mix')
    res.forEach((d: any) => {
      d.checked = check
    });
  }

  validBtn() {
    if (this.testingTypeMenu.data.find((d: any) => d.checked)) return false
    return true
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
    await this.$step3.update(this.testingTypeMenu._id, this.testingTypeMenu).toPromise()
    setTimeout(() => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      })
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  async insert() {
    this.testingTypeMenu.requestId = this.formId
    const resInsert = await this.$step3.insert(this.testingTypeMenu).toPromise()
    setTimeout(() => {
      this.testingTypeMenu._id = resInsert[0]._id
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      })
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  onBack() {
    this._stepper.previous()
  }
}
