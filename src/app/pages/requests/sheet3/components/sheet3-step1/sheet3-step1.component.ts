import { HttpParams } from '@angular/common/http';
import { LogFlowService } from './../../../../../http/log-flow.service';
import { Step5HttpService } from './../../../../../http/step5-http.service';
import { Step1HttpService } from './../../../../../http/step1-http.service';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { UserHttpService } from 'src/app/http/user-http.service';
import { Observable, map, startWith } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { RequestSheetService } from '../../../sheet/request-sheet.service';

export interface ModelNo {
  modelNo: string;
  modelName: string;
  size: string;
  customer: string;
}
@Component({
  selector: 'app-sheet3-step1',
  templateUrl: './sheet3-step1.component.html',
  styleUrls: ['./sheet3-step1.component.scss']
})
export class Sheet3Step1Component implements OnInit {

  @Input() formId: any;
  @Output() formIdChange: EventEmitter<any> = new EventEmitter();
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileUpload') fileUpload!: ElementRef;

  public requestForm = new FormGroup({
    _id: new FormControl(null),
    requestId: new FormControl(''),
    controlNo: new FormControl(null, Validators.required),
    requestSubject: new FormControl(null, Validators.required),
    corporate: new FormControl('', Validators.required),
    requestStatus: new FormControl('normal', Validators.required),
    department: new FormControl('', Validators.required),
    requestDate: new FormControl<String | Date | null>(
      null,
      Validators.required
    ),
    sampleSentToQE_withinDate: new FormControl<String | Date | null>(
      null,
      Validators.required
    ),
    concernShipmentDate: new FormControl(''),
    inputToProductionDate: new FormControl(''),
    concernCustomerDate: new FormControl(''),
    reportRequireDate: new FormControl(''),
    productType: new FormControl('', Validators.required),
    modelNo: new FormControl('', Validators.required),
    modelName: new FormControl('', Validators.required),
    lotNo: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    sampleDescription: new FormControl('', Validators.required),
    files: new FormControl(<any>[]),
    upload: new FormControl(),
    sampleSendQty: new FormControl<Number | null>(
      null,
      Validators.required
    ),
  });

  filteredModelOptions!: Observable<any[]>;

  corporate: any[] = [
    {
      name: 'DST',
      value: 'dst',
    },
    {
      name: 'AMT',
      value: 'amt',
    },
  ];
  models: ModelNo[] = [];
  departments: any[] = [];
  fileProgress = false;
  tempUpload: any[] = [];
  userLogin: any;
  minDate: Date = new Date();
  params: any;
  firstStatus: boolean = false
  firstStatus2: boolean = false
  constructor(
    private _request: RequestSheetService,
    private _loading: NgxUiLoaderService,
    private _stepper: CdkStepper,
    private _router: Router,
    private _route: ActivatedRoute,
    private $request: RequestHttpService,
    public $master: MasterHttpService,
    private $file: FilesHttpService,
    private $step1: Step1HttpService,
    private $step5: Step5HttpService,
    private $log: LogFlowService,
    private translate: TranslateService
  ) {
    this.requestForm.patchValue({ requestDate: new Date() });
    this._route.queryParams.subscribe((params) => (this.params = params));

    const section = localStorage.getItem('RLS_section');
    this.requestForm.patchValue({ department: section });
    // this.requestForm.get('requestDate')?.disable()

    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);
  }



  async ngOnInit() {
    let timerInterval: any;
    if (!this.formId) {
      Swal.fire({
        title: 'sample test ทุกตัวที่มาจาก MDL จะต้องมีการ write OTP มาก่อนทุกครั้ง และ ต้องผ่าน final inspection ก่อนเอาเข้า Reliability test',
        icon: 'warning',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        timer: 6000,
        timerProgressBar: true,
        didOpen: () => {
          const fn1 = () => {
            const SwalHtml = Swal.getPopup()
            if (SwalHtml) {
              const tagB: HTMLElement | null = SwalHtml.querySelector(".swal2-actions")
              if (tagB) {
                timerInterval = setInterval(() => {
                  if (Swal.getTimerLeft()) {
                    const show = Number(Swal.getTimerLeft()) / 1000
                    tagB.textContent = `${Math.ceil(show)}`;
                  }
                }, 100);
              }
            }
          }
          fn1()
        },
        willClose: () => {
          clearInterval(timerInterval);
        }

      })
    }
    this.models = await this.$master.getModelMaster().toPromise();

    this.filteredModelOptions =
      this.requestForm.controls.modelNo.valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filter(value || ''))
      );

    if (this.data) {
      this.requestForm.patchValue({ ...this.data });
    }

    if (this.params && this.params['id']) {
      this.formId = this.params['id'];
      const res: any = await this.$request
        .get_id(this.params['id'])
        .toPromise();
      this.requestForm.patchValue({
        ...res[0].step1,
      });
      if (res[0].status === 'reject_request') {
        this.minDate = moment('1999-01-01').toDate();
      }
    }
    this.setupControlForm()
  }
  setupControlForm() {
    this.requestForm.markAllAsTouched();
    this.onChangeCorporate()
    this.onChangeProductType()
    this.requestForm.get('corporate')?.valueChanges.subscribe(() => this.onChangeCorporate())
    this.requestForm.get('productType')?.valueChanges.subscribe(() => this.onChangeProductType())
    this.requestForm.get('modelNo')?.valueChanges.subscribe(() => this.onChangeModelNo())
  }
  private onChangeCorporate() {
    if (this.firstStatus) {
      this.requestForm.controls.productType.setValue('')
      this.requestForm.controls.modelNo.setValue('')
      this.requestForm.controls.modelName.setValue('')
      this.requestForm.controls.size.setValue('')
      this.requestForm.controls.customer.setValue('')
    } else {
      this.firstStatus = true
    }
    const corporateValue = this.requestForm.controls.corporate.value
    if (corporateValue) {
      this.requestForm.controls['productType'].enable()
    } else {
      this.requestForm.controls['productType'].disable()
    }

    if (this.requestForm.controls.corporate.value == 'amt') {
      this.requestForm.controls.productType.setValue('Prelaunch')
    }
  }
  private onChangeProductType() {
    if (this.firstStatus2) {
      this.requestForm.controls.modelNo.setValue('')
      this.requestForm.controls.modelName.setValue('')
      this.requestForm.controls.size.setValue('')
      this.requestForm.controls.customer.setValue('')
    } else {
      this.firstStatus2 = true
    }

    const productTypeValue = this.requestForm.controls.productType.value
    if (productTypeValue) {
      this.requestForm.controls['modelNo'].enable()
      this.requestForm.controls['modelName'].enable()
      this.requestForm.controls['size'].enable()
      this.requestForm.controls['customer'].enable()
      this.requestForm.controls['lotNo'].enable()
    } else {
      this.requestForm.controls['modelNo'].disable()
      this.requestForm.controls['modelName'].disable()
      this.requestForm.controls['size'].disable()
      this.requestForm.controls['customer'].disable()
      this.requestForm.controls['lotNo'].disable()
    }
  }
  private onChangeModelNo() {
    if (
      this.requestForm.controls.corporate.value == 'dst' &&
      this.requestForm.controls.productType.value == 'Mass'
    ) {
      this.autoFillModel()
    } else {
      this.requestForm.controls.modelName.setValue('')
      this.requestForm.controls.size.setValue('')
      this.requestForm.controls.customer.setValue('')
    }
    this.createControlNo()
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.models.filter((option) =>
      option.modelNo.toLowerCase().includes(filterValue)
    );
  }

  setRequestId(id: string) {
    this._router.navigate([], {
      queryParams: {
        id: id,
      },
      queryParamsHandling: 'merge',
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  autoFillModel() {
    const modelNo = this.requestForm.controls.modelNo.value
    const objModel: any = this.models.find((m: any) => m.modelNo == modelNo);
    if (objModel) {
      this.requestForm.patchValue({
        modelName: objModel.modelName,
        size: objModel.size,
        customer: objModel.customer,
      });
    } else {
      this.requestForm.patchValue({
        modelName: '',
        size: '',
        customer: '',
      });
    }
  }
  async createControlNo() {
    if (
      this.requestForm.controls.corporate.valid &&
      this.requestForm.controls.modelNo.valid
    ) {
      if (this.requestForm.value.controlNo) {
        let value: any = this.requestForm.value.controlNo
        value = value.split('-')
        let newModel: any = this.requestForm.value.modelNo?.padStart(6, '0')
        value = `${value[0]}-${value[1]}-${value[2]}-${value[3]}-${newModel}`
        this.requestForm.controls.controlNo.setValue(value)
      } else {
        const runNumber: any = await this._request.setControlNo(
          this.requestForm.value.corporate,
          this.requestForm.value.modelNo
        );
        this.requestForm.controls.controlNo.setValue(runNumber);
      }
    }
  }

  onUploadFile(e: any) {
    this.fileProgress = true;
    const files = e.target.files;
    this.tempUpload.push(...files);
    this.fileUpload.nativeElement.value = '';
    setTimeout(() => {
      this.fileProgress = false;
      Swal.fire('ATTACH FILE SUCCESS', '', 'success');
    }, 1000);
  }

  onClickViewFile(file: any) {
    const fileTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (file.type && fileTypes.find((t) => t == file.type)) {
      const objUrl = URL.createObjectURL(file);
      window.open(objUrl, '_blank');
    } else {
      let elem = document.createElement('a');
      elem.href = file.path;
      elem.target = '_blank';
      elem.click();
    }
    // const objUrl = URL.createObjectURL(file)
    // window.open(objUrl,'_blank')
  }

  onClickDeleteFile(file: File) {
    Swal.fire({
      title: `Do you want to delete ${file.name}?`,
      icon: 'question',
      showCancelButton: true,
    }).then((ans) => {
      if (ans.isConfirmed) {
        this._loading.start();
        this.tempUpload = this.tempUpload.filter((f: any) => f != file);
        setTimeout(() => {
          this._loading.stopAll();
          Swal.fire('Success', '', 'success');
        }, 200);
      }
    });
  }

  onClickRemoveFile(file: any, index: number) {
    Swal.fire({
      title: `Do you want to delete ${file.name}?`,
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start();
        this.removeFile(file, index);
      }
    });
  }
  async removeFile(file: any, index: number) {
    const resDelete = await this.$file.delete(file.name).toPromise();
    this.data.files = this.data.files.filter(
      (d: any, i: number) => i !== index
    );
    const resUpdate = await this.$step1
      .update(this.data._id, this.data)
      .toPromise();
    window.location.reload();
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success');
      this._loading.stopAll();
    }, 1000);
  }

  onCreateFiles(e: any) {
    Swal.fire({
      title: `Do you want to upload files?`,
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        const files = e.target.files;
        this.fileProgress = true;
        this.createFiles(files);
      }
    });
  }
  async createFiles(files: any) {
    this.data = this.requestForm.value;
    const formData = await this.addFormData(files, this.data.controlNo);
    const resUpload = await this.$file.uploadFile(formData).toPromise();
    this.data.files = [...this.data.files, ...resUpload];
    this.requestForm.patchValue({
      files: this.data.files,
    });
    const resUpdate = await this.$step1
      .update(this.data._id, this.data)
      .toPromise();
    setTimeout(() => {
      this.fileUpload.nativeElement.value = '';
      this.fileProgress = false;
      Swal.fire('SUCCESS', '', 'success');
    }, 1000);
  }
  generateToken(n: number) {
    var chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for (var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }

  addFormData(files: any, controlNo: any) {
    return new Promise((resolve) => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        let type = files[i].name.split('.');
        type = type[type.length - 1];
        const newFileName = `${controlNo}-${this.generateToken(3)}.${type}`;
        formData.append('Files', files[i], newFileName);
        if (i + 1 === files.length) {
          resolve(formData);
        }
      }
    });
  }
  async onNext() {
    Swal.fire({
      title: `Do you want to save draft?`,
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        // this._loading.start();
        console.log(this.requestForm.value);

        if (this.requestForm.value._id) {
          this.update();
        } else {
          this.handleInsert();
        }
      }
    });
  }

  async update() {
    const resUpdateRequest = await this.$request.updateControlNo(this.requestForm.value.requestId, this.requestForm.value).toPromise()
    const resUpdate = await this.$step1
      .update(this.requestForm.value._id, this.requestForm.value)
      .toPromise();
    this.dataChange.emit(this.formId);

    const logData = {
      formId: this.requestForm.value._id,
      action: 'draft',
      user: this.userLogin,
    };
    this.sendLog(logData);
    setTimeout(() => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      });
      this._loading.stopAll();
      this._stepper.next();
    }, 1000);
  }

  async handleInsert() {
    try {
      const body: any = {
        userId: localStorage.getItem('RLS_id'),
        date: new Date(),
        controlNo: this.requestForm.value.controlNo,
        corporate: this.requestForm.value.corporate,
        status: 'draft',
        level: 0,
        table: {},
        nextApprove: this.userLogin,
        qeReceive: {
          date: null,
          qty: null,
        },
      };
      const resItem = await this.$request
        .getByControlNo(new HttpParams().set('controlNo', body.controlNo))
        .toPromise();
      if (resItem && resItem.length != 0) {
        throw 'Duplicate controlNo. Please submit again!!';
      }
      await this.insert(body);
    } catch (error) {
      const str = JSON.stringify(error);
      console.log(error);
      Swal.fire(str, '', 'error');
      setTimeout(() => {
        this._loading.stop();
        this.createControlNo();
      }, 1000);
    }
  }
  async insert(body: any) {
    const resDraft = await this.$request.draft(body).toPromise();
    let resUpload = [];
    if (this.tempUpload.length > 0) {
      const formData = await this.addFormData(
        this.tempUpload,
        resDraft[0].controlNo
      );
      resUpload = await this.$file.uploadFile(formData).toPromise();
    }
    this.requestForm.patchValue({
      controlNo: resDraft[0].controlNo,
      requestId: resDraft[0]._id,
      files: resUpload,
    });

    const requestBody = this.requestForm.value;
    delete requestBody._id;
    const resInsert = await this.$step1.insert(requestBody).toPromise();
    const step5Data = {
      requestId: resDraft[0]._id,
      prevUser: {
        _id: this.userLogin._id,
        name: this.userLogin.name,
      },
      nextUser: {
        _id: this.userLogin._id,
        name: this.userLogin.name,
      },
      prevStatusForm: 'draft',
      nextStatusForm: 'draft',
      comment: [],
      level: 1,
      date: null,
    };
    await this.$step5.insert(step5Data).toPromise();

    this.dataChange.emit(resDraft[0]._id);
    const logData = {
      formId: resDraft[0]._id,
      action: 'draft',
      user: this.userLogin,
    };
    this.sendLog(logData);
    this.setRequestId(resDraft[0]._id);
    this.formIdChange.emit(resDraft[0]._id);
    setTimeout(() => {
      this.requestForm.patchValue({ _id: resInsert[0]._id });

      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      });
      this._loading.stopAll();
      this._stepper.next();
    }, 1000);
  }

  onCancel() {
    Swal.fire({
      title: 'Do you want to cancel?',
      icon: 'question',
      showCancelButton: true,
    }).then((ans: SweetAlertResult) => {
      if (ans.isConfirmed) {
        this.cancelRequest();
      }
    });
  }

  async cancelRequest() {
    try {
      await this.$request.update(this.formId, { status: 'cancel' }).toPromise();
      Swal.fire('SUCCESS', '', 'success');
      setTimeout(() => {
        this._router.navigate(['/request/manage']);
      }, 1000);
    } catch (error) {
      Swal.fire('Something it wrong!!!', '', 'error');
    }
  }

  sendLog(data: any) {
    this.$log.insertLogFlow(data).subscribe((res) => console.log(res));
  }
  handleAdmin() {
    if (localStorage.getItem("RLS_authorize") == 'admin') {
      return true
    }
    return false
  }

  validateProductTypeIsMass() {
    if (this.requestForm.controls.productType.value == 'Mass') {
      return true
    } else {
      return false
    }
  }
  validateProductTypeInvalid() {
    return this.requestForm.controls.productType.invalid
  }

  validateCorporateIsValid() {
    return this.requestForm.controls.corporate.valid
  }
  validateCorporateIsInvalid() {
    return this.requestForm.controls.corporate.invalid
  }


}
