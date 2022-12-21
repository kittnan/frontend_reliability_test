import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private $request: RequestHttpService,
    private $user: UserHttpService,
    private $files: FilesHttpService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params['id']) {
        this.$request.get_id(params['id']).subscribe(res => {
          this.step1 = res[0].step1
          this.step2 = res[0].step2
          this.step3 = res[0].step3
          this.step4 = res[0].step4
          this.step5 = res[0].step5
        })

      }
    })
  }

  async ngOnInit(): Promise<void> {
    const _id: any = sessionStorage.getItem("_id")
    this.userLogin = await this.$user.getUserById(_id).toPromise();
    this._setSubject.setBehaviorMaster();
  }

  uploadFiles(formData: any) {
    return this.$files.uploadFile(formData).toPromise()
  }

  async submit() {
    const resultUpload = await this.uploadFiles(this.step1.upload);
    if (resultUpload && resultUpload.msg) {
      this.step1.files = this.step1.files
    } else {
      const files = this.step1.files;
      this.step1.files = [...files, ...resultUpload]
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

    this.$request.insert(body).subscribe(res => {
      if (res) {
        Swal.fire({
          title: `Create success!!`,
          text: `Your control number is ${res.controlNo}`,
          icon: 'success'
        })
        // this.router.navigate(['/request'])
      }
    })

  }

  appendFormData(data: any) {
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
