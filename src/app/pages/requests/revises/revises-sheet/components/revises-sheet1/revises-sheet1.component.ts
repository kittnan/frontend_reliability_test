import { CdkStepper } from '@angular/cdk/stepper';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, inject, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, map, startWith } from 'rxjs';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { SheetStep1Component } from 'src/app/pages/requests/sheet/components/sheet-step1/sheet-step1.component';
import { RequestSheetService } from 'src/app/pages/requests/sheet/request-sheet.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-revises-sheet1',
  templateUrl: './revises-sheet1.component.html',
  styleUrls: ['./revises-sheet1.component.scss'],
  providers: [SheetStep1Component]
})
export class RevisesSheet1Component implements OnInit {

  @Input() requestId: any
  minDate: Date = new Date()

  sheet1Component: any = inject(SheetStep1Component)
  requestService: any = inject(RequestSheetService)

  public requestForm = new FormGroup({
    _id: new FormControl(null),
    requestId: new FormControl(''),
    controlNo: new FormControl(null, Validators.required),
    requestSubject: new FormControl(null, Validators.required),
    corporate: new FormControl('', Validators.required),
    requestStatus: new FormControl('normal', Validators.required),
    department: new FormControl('', Validators.required),
    requestDate: new FormControl<String | Date | null>(null, Validators.required),
    sampleSentToQE_withinDate: new FormControl<String | Date | null>(null, Validators.required),
    concernShipmentDate: new FormControl(''),
    inputToProductionDate: new FormControl(''),
    concernCustomerDate: new FormControl(''),
    reportRequireDate: new FormControl(''),
    modelNo: new FormControl('', Validators.required),
    modelName: new FormControl('', Validators.required),
    lotNo: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    sampleDescription: new FormControl('', Validators.required),
    files: new FormControl(<any>[]),
    upload: new FormControl(),
  })
  models = this.sheet1Component.models
  filteredModelOptions!: Observable<any[]>;
  fileProgress = false
  tempUpload: any[] = []
  @ViewChild('fileUpload') fileUpload!: ElementRef

  constructor(
    public $master: MasterHttpService,
    private _loading: NgxUiLoaderService,
    private $revise: RevisesHttpService,
    private _stepper: CdkStepper,
    private _router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    const params: HttpParams = new HttpParams().set('id', this.requestId)
    const res = await this.$revise.getByRequestId(params).toPromise()
    console.log("🚀 ~ res:", res)


    this.requestForm.patchValue({ ...res[0].step1 })
    this.requestForm.markAllAsTouched()

    this.requestForm.controls.corporate.disable()
    this.requestForm.controls.modelNo.disable()
    this.requestForm.controls.modelName.disable()
    this.requestForm.controls.size.disable()
    this.requestForm.controls.customer.disable()


    this.models = await this.$master.getModelMaster().toPromise()
    this.filteredModelOptions = this.requestForm.controls.modelNo.valueChanges.pipe(
      startWith(''), map((value: any) => this._filter(value || ''))
    )

  }
  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.models.filter((option: any) => option.modelNo.toLowerCase().includes(filterValue));
  }

  async onSelectCorporate() {
    if (this.requestForm.controls.corporate.valid && this.requestForm.controls.modelNo.valid) {
      const runNumber: any = await this.requestService.setControlNo(this.requestForm.value.corporate, this.requestForm.value.modelNo)
      this.requestForm.controls.controlNo.setValue(runNumber)
    }
  }

  onSelectModelNo() {
    const modelNo = this.requestForm.value.modelNo
    const objModel: any = this.models.find((m: any) => m.modelNo == modelNo)
    if (objModel) {
      this.requestForm.patchValue({
        modelName: objModel.modelName,
        size: objModel.size,
        customer: objModel.customer,
      })
    } else {
      this.requestForm.patchValue({
        modelName: '',
        size: '',
        customer: '',
      })
    }
  }

  onClickViewFile(file: any) {
    const fileTypes = ['image/gif', 'image/jpeg', 'image/png']
    if (file.type && fileTypes.find(t => t == file.type)) {
      const objUrl = URL.createObjectURL(file)
      window.open(objUrl, '_blank')
    } else {
      let elem = document.createElement("a");
      elem.href = file.path;
      elem.target = '_blank'
      elem.click();
    }
  }

  onClickDeleteFile(file: File) {
    Swal.fire({
      title: `Do you want to delete ${file.name}?`,
      icon: 'question',
      showCancelButton: true
    }).then(ans => {
      if (ans.isConfirmed) {
        this._loading.start()
        this.tempUpload = this.tempUpload.filter((f: any) => f != file);
        setTimeout(() => {
          this._loading.stopAll()
          Swal.fire('Success', '', 'success')
        }, 200);
      }
    })
  }


  onCancel() {
    Swal.fire({
      title: 'Do you want to cancel?',
      icon: 'question',
      showCancelButton: true
    }).then((ans: SweetAlertResult) => {
      if (ans.isConfirmed) {
        this.cancelRequest()
      }
    })
  }

  async onNext() {
    Swal.fire({
      title: `Do you want to save draft?`,
      icon: 'question',
      showCancelButton: true
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        console.log(this.requestForm.value);
        this.updateReviseByRequestId(this.requestForm.value.requestId, { step1: this.requestForm.value })
        // if (this.requestForm.value._id) {
        //   this.update()
        // } else {
        //   this.insert()
        // }
      }
    })


  }
  async updateReviseByRequestId(id: any, data: any) {
    try {
      this._loading.start()
      await this.$revise.updateByRequestId(id, data).toPromise()
      setTimeout(() => {
        this._loading.stop()
        this._stepper.next()
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  async cancelRequest() {
    try {
      await this.$revise.deleteByRequestId(this.requestForm.value.requestId).toPromise()
      Swal.fire('SUCCESS', '', 'success')
      setTimeout(() => {
        this._router.navigate(['/request/revises-table']);
      }, 1000);
    } catch (error) {
      Swal.fire('Something it wrong!!!', '', 'error')
    }
  }

}
