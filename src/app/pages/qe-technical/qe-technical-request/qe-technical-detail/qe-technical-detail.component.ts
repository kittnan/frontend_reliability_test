import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { debounceTime, lastValueFrom } from 'rxjs';
import { QueueService } from 'src/app/http/queue.service';
import { ScanHistoryHttpService } from 'src/app/http/scan-history-http.service';
import Swal from 'sweetalert2';

export interface ScanHistory {
  code: string,
  scanDate: Date,
  scanDateLocal: string,
  // at: inspec.at,
  runNo: string,
  condition: {
    value: string,
    name: string
  },
  action: string,
  diff_hour: number,
  diff_min: number,
  total_hour: number,
  queue_id: string,
  user: {
    _id: string,
    authorize: string[],
    createdAt: string,
    createdBy: string,
    department: string,
    email: string,
    employee_ID: string,
    name: string,
    password: string,
    username: string,
    updatedAt: string,
    section: string[],
  },
  createdAt: Date,
  updatedAt: Date,
}


@Component({
  selector: 'app-qe-technical-detail',
  templateUrl: './qe-technical-detail.component.html',
  styleUrls: ['./qe-technical-detail.component.scss']
})
export class QeTechnicalDetailComponent implements OnInit {
  userLogin: any
  @Input() index!: number
  @Input() item: any;
  @Input() equipments: any;
  @Input() formInput: any;

  historyScan: any = []
  inputText = ''
  outputText = ''

  inputId: any = ''

  scanInForm = new FormControl('', Validators.required)
  scanOutForm = new FormControl()

  dateIn: any = new Date()
  dateOut: any = new Date()
  timeIn: any = null
  timeOut: any = null
  constructor(
    private $scanHistory: ScanHistoryHttpService,
    private $queue: QueueService

  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);

    // this.scanInForm.valueChanges.subscribe(value => {
    //   this.isFormValid()
    // })

  }

  async ngOnInit(): Promise<void> {
    try {
      this.scanInForm.valueChanges
        .pipe(debounceTime(300))
        .subscribe(value => {
          this.scanInForm.setValue('')
        })
      this.scanOutForm.valueChanges
        .pipe(debounceTime(300))
        .subscribe(value => {
          this.scanOutForm.setValue('')
        })

      let p0: HttpParams = new HttpParams()
      p0 = p0.set('runNo', JSON.stringify([this.item.work.controlNo]))
      p0 = p0.set('conditionValue', JSON.stringify([this.item.condition.value]))
      p0 = p0.set('conditionName', JSON.stringify([this.item.condition.name]))
      p0 = p0.set('queue_id', this.item._id)
      this.historyScan = await lastValueFrom(this.$scanHistory.get(p0))
      this.item.scans = this.historyScan

      // this.item.inspectionTime.map((inspec: any) => {
      //   inspec.pass = false
      // })
      // if (this.historyScan.length != 0) {
      //   this.loopPassInspec()
      // }
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }

  }
  async scan(e: any, action: string, inputId: string) {
    try {
      this.inputId = inputId
      // if (e.key === 'Control') {
      //   this.scanInForm.setValue('')
      //   throw 'Please Scan Label'
      // }
      if (e.key == 'Enter' || e.key == 'Tab') {
        let value: string = e.target.value
        value = value.trim()
        e.preventDefault();
        if (!value) throw 'Code not correct'
        if (!this.equipments.some((eq: any) => eq.name == value)) throw 'Code not correct'

        const currentStage = this.item.inspectionTime.filter((a: any) => !a.pass).sort((a: any, b: any) => a.at - b.at)[0]
        if (!currentStage) throw 'no stage match'
        const scan = {
          code: value,
          scanDate: new Date(),
          scanDateLocal: moment().toLocaleString(),
          stage: currentStage.at,
          runNo: this.item.work.controlNo,
          condition: this.item.condition,
          action: action,
          diff_hour: 0,
          diff_min: 0,
          total_hour: 0,
          queue_id: this.item._id,
          user: this.userLogin,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const lastItem = this.item.scans.filter((scan: any) => scan.code == value).pop()
        if (lastItem && lastItem.action == action) throw `Please scan`
        // if (lastItem.action == action) throw `Please scan`


        if (action === 'in') {
          scan.scanDate = moment(this.dateIn)
            .set({
              hour: moment(this.timeIn, 'HH:mm').hour(),
              minute: moment(this.timeIn, 'HH:mm').minute(),
              second: 0,  // You can adjust seconds if necessary
            }).toDate();

          if (currentStage.at === 0) {
            currentStage.pass = true

            this.item.scans = [scan]
            await this.$scanHistory.insert(scan).toPromise()
            const nextStage = this.currentStage()
            this.item.stage = nextStage.at
            await this.$queue.update(this.item._id, this.item).toPromise()
            this.clearInputAndFocus(inputId)
          } else {
            if (this.item.scans?.length != 0) {
              if (moment(scan.scanDate).isAfter(moment(this.item.scans[this.item.scans.length - 1]["scanDate"]))) {
                this.item.scans.push(scan)
                await this.$scanHistory.insert(scan).toPromise()
                this.clearInputAndFocus(inputId)
              } else {
                console.log('before');
                throw 'Please change date scan'
              }
            } else {
              this.item.scans.push(scan)
              await this.$scanHistory.insert(scan).toPromise()
              this.clearInputAndFocus(inputId)
            }

          }

        }
        if (action === 'out') {
          // scan.scanDate = moment(scan.scanDate).add('second', 396000).toDate() //! for test

          scan.scanDate = moment(this.dateOut)
            .set({
              hour: moment(this.timeOut, 'HH:mm').hour(),
              minute: moment(this.timeOut, 'HH:mm').minute(),
              second: 0,  // You can adjust seconds if necessary
            }).toDate();

          if (moment(scan.scanDate).isAfter(moment(this.item.scans[this.item.scans.length - 1]["scanDate"]))) {
            const diff = moment(scan.scanDate).diff(lastItem.scanDate, 'second')
            const diffObj = this.convertSecondsToHoursAndMinutes(diff)
            scan.diff_hour = diffObj.hours
            scan.diff_min = diffObj.minutes
            this.item.total_hour = this.item.total_hour ? this.item.total_hour : 0
            this.item.total_hour += diffObj.hours
            this.item.scans.push(scan)

            await this.$scanHistory.insert(scan).toPromise()

            //  ! in case over 3 day ปัดลงเท่ากับ stage
            if (this.item.total_hour >= currentStage.at) {
              currentStage.pass = true
              const nextStage = this.currentStage()
              if (nextStage) {
                this.item.total_hour = currentStage.at
                this.item.stage = nextStage.at
                await this.$queue.update(this.item._id, this.item).toPromise()
              } else {
                this.item.total_hour = currentStage.at
                await this.$queue.update(this.item._id, this.item).toPromise()
                console.log('no next stage');
              }
            } else if ((this.item.total_hour + 20) >= currentStage.at) {
              this.item.total_hour = currentStage.at
              currentStage.pass = true
              const nextStage = this.currentStage()
              if (nextStage) {
                this.item.stage = nextStage.at
                await this.$queue.update(this.item._id, this.item).toPromise()
              } else {
                await this.$queue.update(this.item._id, this.item).toPromise()
                console.log('no next stage');
              }
            } else {
              await this.$queue.update(this.item._id, this.item).toPromise()
            }
            this.clearInputAndFocus(inputId)
          }else{
            throw 'Please change date scan'
          }


        }
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
      Swal.fire(JSON.stringify(error), '', 'error')
    }
  }


  currentStage(): any {
    return this.item.inspectionTime.filter((a: any) => !a.pass).sort((a: any, b: any) => a.at - b.at)[0]
  }


  convertSecondsToHoursAndMinutes(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes }
  }
  clearInputAndFocus(inputId: string) {
    let el: any = document.querySelector('#' + inputId);
    if (el) {
      setTimeout(() => {
        this.inputText = ''; // Use value to clear input elements
        this.outputText = ''; // Use value to clear input elements
        el.focus(); // Set focus to the element
      }, 300);
    }
  }

  get isFormValid(): boolean {
    return this.dateIn && this.timeIn;
  }

}
