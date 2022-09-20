import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { UserForm } from 'src/app/interface/user';
import { LogFlowService } from 'src/app/services/log-flow.service';
import { ShareFunctionService } from 'src/app/services/share-function.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
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
    config_auth = 'request_approve'
    edit_status: boolean = false;
    id_request: any;
    constructor(
        private _homeService: HomeServiceService,
        private _request: RequestHttpService,
        private _files: FilesHttpService,
        private _load: NgxUiLoaderService,
        private _toast: ToastService,
        private _user: UserHttpService,
        private $router: Router,
        private route: ActivatedRoute,
        private $share: ShareFunctionService
    ) { }


    async ngOnInit(): Promise<void> {
        this._homeService._formStep1.subscribe(res => this.step1 = res);
        this._homeService._formStep2.subscribe(res => this.step2 = res);
        this._homeService._formStep3.subscribe(res => this.step3 = res);

        const _id = localStorage.getItem('_id');
        if (_id) {
            this.userLogin = await this._user.getUserById(_id).toPromise();
            this.userRequest.setValue(this.userLogin)
            const temp = await this._user.getUserBySection(this.userLogin.section).toPromise()
            this.userApproveList = await this.filterRequestApprove(temp)
        }

        this.route.queryParams.subscribe(async params => {
            if (params['id']) {
                this.id_request = params['id'];
                this.edit_status = true;
            }
        })
    }
    filterRequestApprove(userList: any) {
        return new Promise(resolve => {
            resolve(
                userList.filter((user: any) =>
                    user.authorize.find((auth: any) => auth === this.config_auth)
                )

            )
        })
    }

    async onSubmit() {

        Swal.fire({
            title: 'Do you want to request ?',
            icon: 'question',
            showCancelButton: true,
            input: 'textarea',
        }).then((value: SweetAlertResult) => {
            if (value.isConfirmed) {
                this.onConfirm(value.value)
            }
        })

    }
    async onConfirm(confirmValue: string) {

        if (this.edit_status) {
            this.editData(confirmValue);
        } else {
            this.create(confirmValue);
        }

    }

    private async editData(confirmValue: any) {
        try {
            this._load.start();
            const step4 = await this.setStep4();
            let stepAll: any = this._homeService.getFormAll();
            stepAll = {
                ...stepAll,
                step4: step4,
                status: 'request'
            }
            if (stepAll.step1.files.length > 0) {
                const fileFormData = await this.addFileToFormData(stepAll.step1.files);
                stepAll.step1.files = await this._files.uploadFile(fileFormData).toPromise();
                if (stepAll.step1.files_old.length > 0) {
                    const resDeleteFile = await this._files.deleteFile(this.step1.files_old).toPromise();
                    stepAll.step1.files = stepAll.step1.files.concat(resDeleteFile)
                    this.updateData(stepAll, confirmValue)
                } else {
                    this.updateData(stepAll, confirmValue)

                }
            } else {
                this.updateData(stepAll, confirmValue)
            }
   
        } catch (error) {

        }
    }
    async updateData(stepAll: any, confirmValue: any) {
        const updated = await this.updateRequest(stepAll);
        if (updated) {
            (await this.$share.insertLogFlow('request', stepAll.step1.controlNo, confirmValue, this.userLogin)).toPromise()
            this._load.stopAll();
            Swal.fire('Request form send to approver success!!', '', 'success');
            setTimeout(() => {
                this.$router.navigate(['/request/manage'])
            }, 1000);
        }
    }

    private async create(confirmValue: any) {
        try {
            this._load.start();
            const step4 = await this.setStep4();
            let stepAll: any = this._homeService.getFormAll();
            stepAll = {
                ...stepAll,
                step4: step4,
                status: 'request'
            }
            if (stepAll.step1.files.length > 0) {
                const fileFormData = await this.addFileToFormData(stepAll.step1.files);
                stepAll.step1.files = await this._files.uploadFile(fileFormData).toPromise();
                if (stepAll.step1.files_old.length > 0) {
                    const resDeleteFile = await this._files.deleteFile(this.step1.files_old).toPromise();
                    stepAll.step1.files = stepAll.step1.files.concat(resDeleteFile)
                }
            }
            const created = await this.createRequest(stepAll);
            if (created && created.msg) {
                Swal.fire(created.msg, '', 'warning');
                Swal.fire('Request form send to approver success!!', '', 'success');
            } else {
                Swal.fire('Request form send to approver success!!', '', 'success');
            }
            (await this.$share.insertLogFlow('request', stepAll.step1.controlNo, confirmValue, this.userLogin)).toPromise();
            setTimeout(() => {
                this._load.stopAll();
                this.$router.navigate(['/request/manage'])
            }, 1000);

        } catch (error) {
            this._load.stopAll();
        } finally {
            this._load.stopAll();

        }
    }

    async createRequest(body: any) {
        return await this._request.insertRequest_form(body).toPromise()
    }

    async updateRequest(body: any) {
        return await this._request.updateRequest_form(this.id_request, body).toPromise();
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
            let arr = []
            arr.push({
                access: 'request',
                name: this.userLogin,
                status: true,
                time: new Date()
            })
            arr.push({
                access: 'request_approve',
                name: this.userApprove.value,
                status: false,
                time: null
            })
            resolve(
                arr
            )
        })
    }


    uploadFile(files: FileList) {
        return new Promise(resolve => {
            let formData = new FormData();
            for (let index = 0; index < files.length; index++) {
                formData.append('Files', files[index], files[index].name)
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
