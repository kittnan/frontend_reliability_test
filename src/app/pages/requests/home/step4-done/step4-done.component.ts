import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { UserForm } from 'src/app/interface/user';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { HomeServiceService } from '../home-service.service';

@Component({
    selector: 'app-step4-done',
    templateUrl: './step4-done.component.html',
    styleUrls: ['./step4-done.component.scss']
})
export class Step4DoneComponent implements OnInit {

    userRequest = new FormControl('', Validators.required)
    userApprove = new FormControl('', Validators.required)
    dateRequest: any = new Date()

    step1: any = {}
    step2: any = {}
    step3: any = {}

    userLogin!: any;
    userApproveList!: any;
    constructor(
        private _homeService: HomeServiceService,
        private _request: RequestHttpService,
        private _files: FilesHttpService,
        private _load: NgxUiLoaderService,
        private _toast: ToastService,
        private _user: UserHttpService,
        private $router: Router
    ) { }


    async ngOnInit(): Promise<void> {
        this._homeService._formStep1.subscribe(res => this.step1 = res);
        this._homeService._formStep2.subscribe(res => this.step2 = res);
        this._homeService._formStep3.subscribe(res => this.step3 = res);

        const _id = localStorage.getItem('_id');
        if (_id) {
            this.userLogin = await this._user.getUserById(_id).toPromise();
            this.userRequest.setValue(this.userLogin)
            this.userApproveList = await this._user.getUserBySection(this.userLogin.section).toPromise()
        }
    }

    async onSubmit() {
        try {
            this._load.start();
            const step4 = await this.setStep4();
            console.log(step4);
            
            let stepAll: any = this._homeService.getFormAll();
            stepAll = {
                ...stepAll,
                step4: step4,
                status: 'request'
            }
            const fileFormData = await this.addFileToFormData(stepAll.step1.files);
            stepAll.step1.files = await this._files.uploadFile(fileFormData).toPromise();
            const created = await this.createRequest(stepAll);
            if (created[0].step1.controlNo === stepAll.step1.controlNo) {
                Swal.fire(`Duplicate control no. Now changed to ${created[0].controlNo}!!`, '', 'warning');
                Swal.fire('Request form send to approver success!!', '', 'success');
                setTimeout(() => {
                    this._load.stopAll();
                    this.$router.navigate(['/request/manage'])
                }, 1000);
            } else {
                Swal.fire('Request form send to approver success!!', '', 'success');
                setTimeout(() => {
                    this._load.stopAll();
                    this.$router.navigate(['/request/manage'])
                }, 1000);
            }

        } catch (error) {
            this._load.stopAll();
        } finally {
            this._load.stopAll();
        }


    }
    async createRequest(body: any) {
        return await this._request.insertRequest_form(body).toPromise()
    }

    addFileToFormData(files: any) {
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData();
            for (let index = 0; index < files.length; index++) {
                const name = `Files`;
                const fileName = `${new Date().getTime()}_${files[index].name}`
                formData.append(name, files[index], fileName)
                if (index + 1 === files.length) {
                    resolve(formData)
                }
            }
        })


    }

    setStep4() {
        return new Promise(resolve => {
            console.log(this.userLogin);
            console.log(this.userApprove);
            
            resolve(
                {
                    userRequest: {
                        name: this.userLogin,
                        status: true,
                        time: new Date()
                    },
                    userApprove: {
                        name: this.userApprove.value,
                        status: false,
                        time: null
                    }
                }
            )
        })
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
