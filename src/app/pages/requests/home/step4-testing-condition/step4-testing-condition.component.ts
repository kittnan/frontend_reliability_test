import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ToastService } from 'src/app/services/toast.service';
import { HomeServiceService } from '../home-service.service';

@Component({
    selector: 'app-step4-testing-condition',
    templateUrl: './step4-testing-condition.component.html',
    styleUrls: ['./step4-testing-condition.component.scss']
})
export class Step4TestingConditionComponent implements OnInit {

    userRequest = new FormControl('', Validators.required)
    dateRequest: any = new Date()


    step1: any = {}
    step2: any = {}
    step3: any = {}
    constructor(
        private _homeService: HomeServiceService,
        private _request: RequestHttpService,
        private _files: FilesHttpService,
        private _load: NgxUiLoaderService,
        private _toast: ToastService
    ) { }

    ngOnInit(): void {

        this._homeService._formStep1.subscribe(res => this.step1 = res);
        this._homeService._formStep2.subscribe(res => this.step2 = res);
        this._homeService._formStep3.subscribe(res => this.step3 = res);
    }

    validButtonSubmit() {
        if (this.step1 == "" || this.step2 == "" || this.step3 == "") {
            return true
        } else {
            return false
        }
    }

    async onSubmit() {
        this._load.start();
        const step4 = {
            userRequest: {
                name: this.userRequest.value,
                status: true,
                time: new Date()
            },
            userApprove: {
                name: '',
                status: false,
                time: ''
            }
        }
        let result = this._homeService.getFormAll()
        result.step4 = step4
        const status = 'request';

        if (result.step1.files.length > 0) {
            const resultUploadFile = await this.uploadFile(result.step1.files)
            result.step1.files = resultUploadFile
            const body = {
                ...result,
                status: status
            }
            console.log(body);

            this._request.insertRequest_form(body).subscribe(res => {
                if (res.length > 0) {
                    setTimeout(() => {
                        this._load.stopAll()
                        this._toast.success();
                        location.href = '/request'
                    }, 500);
                }
            })
        } else {
            const body = {
                ...result,
                status: status
            }
            console.log(body);

            this._request.insertRequest_form(body).subscribe(res => {
                if (res.length > 0) {
                    setTimeout(() => {
                        this._load.stopAll()
                        this._toast.success();
                        location.href = '/request'
                    }, 500);
                }
            })
        }


    }

    uploadFile(files: FileList) {
        return new Promise(resolve => {
            let formData = new FormData();
            for (let index = 0; index < files.length; index++) {
                formData.append('File', files[index], files[index].name)
                if (index + 1 == files.length) {
                    this._files.uploadFile(formData).subscribe(res => {
                        console.log(res);
                        resolve(res)
                    })
                }
            }

        })
    }

}
