import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TempFormService {

  private tempForm: BehaviorSubject<any> = new BehaviorSubject('');
  public $tempForm: Observable<any> = this.tempForm.asObservable();
  constructor() { }

  setTempForm(value: any) {
    this.tempForm.next(value)
  }
  getTempForm() {
    return this.tempForm.value
  }
}
