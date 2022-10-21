import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MasterHttpService } from 'src/app/http/master-http.service';
@Injectable({
  providedIn: 'root'
})
export class SetSubjectService {


  private formStep1: BehaviorSubject<any> = new BehaviorSubject('');
  public _formStep1: Observable<any> = this.formStep1.asObservable();

  private formStep2: BehaviorSubject<any> = new BehaviorSubject('');
  public _formStep2: Observable<any> = this.formStep2.asObservable();

  private formStep3: BehaviorSubject<any> = new BehaviorSubject('');
  public _formStep3: Observable<any> = this.formStep3.asObservable();

  private formStep4: BehaviorSubject<any> = new BehaviorSubject('');
  public _formStep4: Observable<any> = this.formStep4.asObservable();

  private department_master: BehaviorSubject<any> = new BehaviorSubject('');
  public _department_master: Observable<any> = this.department_master.asObservable();

  private model_master: BehaviorSubject<any> = new BehaviorSubject('');
  public _model_master: Observable<any> = this.model_master.asObservable();

  private testPurpose_master: BehaviorSubject<any> = new BehaviorSubject('');
  public _testPurpose_master: Observable<any> = this.testPurpose_master.asObservable();

  private testingType_master: BehaviorSubject<any> = new BehaviorSubject('');
  public _testingType_master: Observable<any> = this.testingType_master.asObservable();

  private interval_master: BehaviorSubject<any> = new BehaviorSubject('');
  public _interval_master: Observable<any> = this.interval_master.asObservable();
  constructor(
    private __master_service: MasterHttpService
  ) { }

  setFormStep1(newValue: any) {
    this.formStep1.next(newValue)
  }
  setFormStep2(newValue: any) {
    this.formStep2.next(newValue)
  }
  setFormStep3(newValue: any) {
    this.formStep3.next(newValue)
  }
  setFormStep4(newValue: any) {
    this.formStep4.next(newValue)
  }

  getFormStep1(){
    return this.formStep1.value
  }

  getFormStep2(){
    return this.formStep2.value
  }

  getFormStep3(){
    return this.formStep3.value
  }

  getFormStep4(){
    return this.formStep4.value
  }
  getFormAll() {
    const form = {
      step1: this.formStep1.value,
      step2: this.formStep2.value,
      step3: this.formStep3.value,
      step4: this.formStep4.value
    }
    return form
  }

  async setBehaviorMaster() {
    await this.__master_service.getDepartmentMaster().toPromise().then(res => this.setDepartmentMaster(res))
    await this.__master_service.getModelMaster().toPromise().then(res => this.setModelMaster(res))
    await this.__master_service.getTestPurposeMaster().toPromise().then(res => this.setTestPurposeMaster(res))
    await this.__master_service.getTestingTypeMaster().toPromise().then(res => this.setTestingTypeMaster(res))
    await this.__master_service.getIntervalMaster().toPromise().then(res => this.setIntervalMaster(res))


  }

  private setDepartmentMaster(newValue: any) {
    this.department_master.next(newValue)
  }
  private setModelMaster(newValue: any) {
    this.model_master.next(newValue)
  }
  private setTestPurposeMaster(newValue: any) {
    this.testPurpose_master.next(newValue)
  }
  private setTestingTypeMaster(newValue: any) {
    this.testingType_master.next(newValue)
  }
  private setIntervalMaster(newValue: any) {
    this.interval_master.next(newValue)
  }

  getDepartmentMaster() {
    return this._department_master
  }
  getModelMaster() {
    return this._model_master
  }
  getTestPurposeMaster() {
    return this._testPurpose_master
  }
  getTestingTypeMaster() {
    return this._testingType_master
  }
  getIntervalMaster() {
    return this._interval_master
  }

}
