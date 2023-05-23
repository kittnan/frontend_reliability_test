import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';


interface dataForm {
  checked: boolean,
  groupName: String,
  list: listForm[]
}
interface listForm {
  checked: boolean,
  name: String
}
@Component({
  selector: 'app-revise-sheet3',
  templateUrl: './revise-sheet3.component.html',
  styleUrls: ['./revise-sheet3.component.scss']
})
export class ReviseSheet3Component implements OnInit {
  @Input() form: any = null
  testingTypeMenu: any = {
    data: [],
    requestId: null
  }
  constructor(
    private _loading: NgxUiLoaderService,
    private _stepper: CdkStepper,
    private $revise: RevisesHttpService
  ) {

  }

  async ngOnInit() {
    this.testingTypeMenu = this.form.step3
    this.testingTypeMenu.data = this.testingTypeMenu.data.map((a: any) => {
      a['prevChecked'] = a.checked
      a.list = a.list.map((b: any) => {
        return {
          ...b,
          prevChecked: b.checked
        }
      })
      return a
    })

  }

  filterOven() {
    const res = this.testingTypeMenu.data.filter((d: any) => d.type == 'oven')
    return res
  }
  filterNoOven() {
    const res = this.testingTypeMenu.data.filter((d: any) => d.type == 'noOven' || d.type == 'mix')
    return res
  }
  onCheckAll2(key: any) {
    const check = key.checked
    const res = this.testingTypeMenu.data.filter((d: any) => d.type == 'noOven' || d.type == 'mix')
    res.forEach((d: any) => {
      d.checked = check
    });
  }


  handleNext() {
    Swal.fire({
      title: `Do you want to save draft?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
        this.update()
      }
    })
  }

  private async update() {
    try {
      this.form = {
        ...this.form,
        step3: this.testingTypeMenu
      }
      await this.$revise.update(this.form._id, this.form).toPromise()
      this._loading.stop()
      this.next()
    } catch (error) {
      console.log(error);
      this._loading.stop()
    } finally {
      this._loading.stop()
    }
  }

  next() {
    this._stepper.next()
  }

}
