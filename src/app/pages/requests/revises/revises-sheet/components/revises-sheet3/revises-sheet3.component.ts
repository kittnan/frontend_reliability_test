import { CdkStepper } from '@angular/cdk/stepper';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { Step3HttpService } from 'src/app/http/step3-http.service';
import { Step4HttpService } from 'src/app/http/step4-http.service';
import { RequestSheetService } from 'src/app/pages/requests/sheet/request-sheet.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-revises-sheet3',
  templateUrl: './revises-sheet3.component.html',
  styleUrls: ['./revises-sheet3.component.scss']
})
export class RevisesSheet3Component implements OnInit {

  // @Input() step3: any
  @Input() requestId: any
  // step3: any = null

  testingTypeMenu: any = {
    data: [],
    requestId: null
  }
  constructor(
    private _loader: NgxUiLoaderService,
    private _stepper: CdkStepper,
    private route: ActivatedRoute,
    private $master: MasterHttpService,
    private _requestSheet: RequestSheetService,
    private $step3: Step3HttpService,
    private $revise: RevisesHttpService,
  ) {
    // this.route.queryParams.subscribe((params: any) => {
    //   if (params.id) {
    //     this.requestId = params.id
    //   }
    // })
  }

  async ngOnInit() {
    const resTestingType = await this.$master.getTestingTypeMaster().toPromise();
    const resultMap: any = await this._requestSheet.setTestingTypeList(resTestingType)
    this.testingTypeMenu = {
      requestId: this.requestId,
      data: resultMap
    };
    if (this.requestId) {

      const params: HttpParams = new HttpParams().set('id', this.requestId)
      const res = await this.$revise.getByRequestId(params).toPromise()
      if (res && res.length > 0) {
        this.testingTypeMenu = res[0].step3
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
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loader.start()
        await this.$revise.updateByRequestId(this.testingTypeMenu.requestId, { step3: this.testingTypeMenu }).toPromise()
        setTimeout(() => {
          this._loader.stop()
          Swal.fire('Success', '', 'success')
          this._stepper.next()
        }, 1000);
      }
    })
  }
  onBack() {
    this._stepper.previous()
  }

}
