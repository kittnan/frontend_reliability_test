import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MasterHttpService } from 'src/app/http/master-http.service';
export interface TestPurpose {
  _id: string,
  name: string,
  checked: boolean,
  description: {
    status: boolean,
    value: string
  }
}
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  @Input() step2: any;
  @Output() step2Change = new EventEmitter<any>();

  testPurposes: TestPurpose[] = []
  disable: boolean = true

  constructor(
    private _master: MasterHttpService
  ) { }

  ngOnInit(): void {
    this._master.getTestPurposeMaster().subscribe(res => {
      this.testPurposes = res;
      if (this.step2 && res) {

        this.testPurposes = this.testPurposes.map((t: any) => {
          if (t.name == this.step2.purpose) {
            t.checked = true;
            t.description = this.step2.description
            return t
          } else {
            return t
          }
        })
      }
    })

  }

  onCheckRadio(event: any, purpose: any) {
    this.testPurposes = this.testPurposes.map((p: any) => {
      p.checked = false
      return p
    })
    purpose.checked = true
    this.step2  ={
      ... purpose,
      purpose: purpose.name
    }
    delete this.step2.name
    this.step2Change.emit(this.step2)
  }
  onInputDescription(event: any) {
    const value = event.target.value
    this.step2.description.value = value
    this.step2Change.emit(this.step2)
    
  }

}
