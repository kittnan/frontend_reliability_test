import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import Swal from 'sweetalert2';
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
    private _httpRequest: RequestHttpService,
    private _user: UserHttpService,
    private _file :FilesHttpService,
    private router:Router

  ) { }

  async ngOnInit(): Promise<void> {
    const _id: any = localStorage.getItem("_id")
    this.userLogin = await this._user.getUserById(_id).toPromise();
    this._setSubject.setBehaviorMaster();
  }

  uploadFiles(formData:any) {
    return this._file.uploadFile(formData).toPromise()
  }

  async submit() {
    const resultUpload = await this.uploadFiles(this.step1.upload);
    if(resultUpload && resultUpload.msg){
      this.step1.files = this.step1.files
    }else{
      const files = this.step1.files;
      this.step1.files = [...files,...resultUpload]
    }
    const detail = this.step1;
    const testPurpose = this.step2;

    const testingType = {
      data: this.step3
    }
    const testingCondition = this.step4;
    const userApprove = this.step5;
    const body = {
      request: this.userLogin,
      detail: detail,
      testPurpose: testPurpose,
      testingType: testingType,
      testingCondition: testingCondition,
      userApprove: userApprove,
    }

    this._httpRequest.insertRequest_form(body).subscribe(res => {
      console.log(res);
      if(res){
        Swal.fire({
          title:`Create success!!`,
          text:`Your control number is ${res.controlNo}`,
          icon:'success'
        })
        // this.router.navigate(['/request'])
      }
    })

  }

  appendFormData(data: any) {
    console.log(data);

    return new Promise(resolve => {
      const formData = new FormData
      for (let index = 0; index < data.length; index++) {
        formData.append('files', data[index].data, (new Date().getTime()).toString())
      }
      resolve(
        formData
      )
    })
  }

}
