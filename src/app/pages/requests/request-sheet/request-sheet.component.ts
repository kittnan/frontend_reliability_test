import { Component, OnInit } from '@angular/core';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { SetSubjectService } from './set-subject.service';

@Component({
  selector: 'app-request-sheet',
  templateUrl: './request-sheet.component.html',
  styleUrls: ['./request-sheet.component.scss']
})
export class RequestSheetComponent implements OnInit {

  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;

  userLogin: any
  constructor(
    private _setSubject: SetSubjectService,
    private _httpRequest :RequestHttpService,
    private _user: UserHttpService,

  ) { }

  async ngOnInit(): Promise<void> {
    const _id: any = localStorage.getItem("_id")
    this.userLogin = await this._user.getUserById(_id).toPromise();
    this._setSubject.setBehaviorMaster();
  }

  foo() {

  }

  submit() {
    console.log("🚀 ~ file: request-sheet.component.ts ~ line 31 ~ RequestSheetComponent ~ submit ~ this.step1", this.step1)
    console.log("🚀 ~ file: request-sheet.component.ts ~ line 31 ~ RequestSheetComponent ~ submit ~ this.step2", this.step2)
    console.log("🚀 ~ file: request-sheet.component.ts ~ line 31 ~ RequestSheetComponent ~ submit ~ this.step3", this.step3)
    console.log("🚀 ~ file: request-sheet.component.ts ~ line 31 ~ RequestSheetComponent ~ submit ~ this.step4", this.step4)
    console.log("🚀 ~ file: request-sheet.component.ts ~ line 31 ~ RequestSheetComponent ~ submit ~ this.step5", this.step5)

    const detail = this.step1;
    const testPurpose = this.step2;

    const testingType = {
      data: this.step3
    }
    const testingCondition = this.step4;
    const userApprove = this.step5
    const body = {
      request:this.userLogin,
      detail:detail,
      testPurpose:testPurpose,
      testingType:testingType,
      testingCondition:testingCondition,
      userApprove:userApprove
    }
    this._httpRequest.insertRequest_form(body).subscribe(res=>{
      console.log(res);

    })

  }

}
