import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
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

  constructor(
    private $scanHistory: ScanHistoryHttpService,
    private $queue: QueueService

  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);
  }

  async ngOnInit(): Promise<void> {
    try {
      let p0: HttpParams = new HttpParams()
      p0 = p0.set('runNo', JSON.stringify([this.item.work.controlNo]))
      p0 = p0.set('conditionValue', JSON.stringify([this.item.condition.value]))
      p0 = p0.set('conditionName', JSON.stringify([this.item.condition.name]))
      p0 = p0.set('queue_id', this.item._id)
      this.historyScan = await lastValueFrom(this.$scanHistory.get(p0))
      this.loopPassInspec()
      if (this.historyScan?.length != 0) {
        this.item.scans = this.historyScan
      } else {
        this.item.scans = []
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }

  }
  async scan(e: any, action: string, inputId: string) {
    try {
      if (e.key == 'Enter' || e.key == 'Tab') {
        let value: string = e.target.value
        value = value.trim()
        e.preventDefault();
        if (!value) throw 'Code not correct'
        if (!this.equipments.some((eq: any) => eq.name == value)) throw 'Code not correct'
        let scan: ScanHistory = {
          code: value,
          scanDate: new Date(),
          scanDateLocal: moment().toLocaleString(),
          // at: inspec.at,
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
        if (action == 'in') {
          this.scanIn(action, scan, value, inputId)
        }
        if (action == 'out') {
          this.scanOut(action, scan, value, inputId)
        }
      }
    } catch (error) {
      alert(error)
      this.clearInputAndFocus(inputId)
      console.log("🚀 ~ error:", error)
    }

  }

  private async scanIn(action: string, scan: ScanHistory, value: string, inputId: string) {
    if (this.item.scans && this.item.scans.length != 0) {
      const lastItem = this.item.scans.filter((scan: any) => scan.code == value).pop()
      if (lastItem?.action != action) {
        this.item.scans.push(scan)
        const res1 = await this.$scanHistory.insert(scan).toPromise()
        this.clearInputAndFocus(inputId)
      } else {
        alert('Please Scan Out')
        this.clearInputAndFocus(inputId)
      }

    } else {
      this.item.scans = [scan]
      const res1 = await this.$scanHistory.insert(scan).toPromise()
      this.item.total_hour = 0
      if (this.item.inspectionTime[0].at == 0) {
        this.item.inspectionTime[0].pass = true
      }
      const res2 = await this.$queue.update(this.item._id, this.item).toPromise()
      this.clearInputAndFocus(inputId)
    }
  }

  private async scanOut(action: string, scan: ScanHistory, value: string, inputId: string) {
    try {
      scan.scanDate = moment(scan.scanDate).add('second', 793000).toDate() //! for test
      if (this.item.scans && this.item.scans.length != 0) { // เช็คว่าเป็นสแกนครั้งแรกไหม

        const lastItem = this.item.scans.filter((scan: any) => scan.code == value).pop()
        if (lastItem?.action != action) { // ครั้งล่าสุดไม่ใช่ output
          let diff: number = moment(scan.scanDate).diff(lastItem.scanDate, 'second')
          const diffObj = this.convertSecondsToHoursAndMinutes(diff)
          scan.diff_hour = diffObj.hours
          scan.diff_min = diffObj.minutes
          // console.log("🚀 ~ scan:", scan)
          this.item.scans.push(scan)
          const res1 = await this.$scanHistory.insert(scan).toPromise()

          // this.item.total_hour += scan.diff_hour
          // const timeInspectNow = this.item.inspectionTime.find((time: any) => !time.pass)
          // if (!timeInspectNow) throw 'No inspection time'
          // const diffHr = Math.abs(timeInspectNow.at - this.item.total_hour)
          // if (diffHr > 20) throw 'ไม่ครบกำหนด'
          // this.item.total_hour -= scan.diff_hour
          // scan.diff_hour = timeInspectNow.at
          // scan.diff_min = 0
          // this.item.total_hour += timeInspectNow.at

          // console.log(this.item);
          // console.log(scan);


          // this.item.scans.push(scan)
          // this.item.total_hour = this.item.scans.reduce((p: any, n: any) => {
          //   if (n.action == 'out') {
          //     p += n.diff_hour
          //   }
          //   return p
          // }, 0)
          // scan.total_hour = this.item.total_hour
          // const res1 = await this.$scanHistory.insert(scan).toPromise()
          // const res2 = await this.$queue.update(this.item._id, this.item).toPromise()
          this.clearInputAndFocus(inputId)
        } else {
          alert('Please Scan In')
          this.clearInputAndFocus(inputId)
        }

      } else {
        this.item.scans = [scan]
        const res1 = await this.$scanHistory.insert(scan).toPromise()
        const res2 = await this.$queue.update(this.item._id, this.item).toPromise()
        this.clearInputAndFocus(inputId)
      }
      this.loopPassInspec()
    } catch (error) {
      console.log("🚀 ~ error:", error)
      Swal.fire(JSON.stringify(error), '', 'error')
    }

  }

  async loopPassInspec() {
    let p0: HttpParams = new HttpParams()
    p0 = p0.set('runNo', JSON.stringify([this.item.work.controlNo]))
    p0 = p0.set('conditionValue', JSON.stringify([this.item.condition.value]))
    p0 = p0.set('conditionName', JSON.stringify([this.item.condition.name]))
    p0 = p0.set('queue_id', this.item._id)
    this.historyScan = await lastValueFrom(this.$scanHistory.get(p0))
    if (this.historyScan?.length != 0) {
      console.clear()
      console.log(this.historyScan);

      let times = this.item.inspectionTime.map((time: any) => time.at)

      const total = this.historyScan.filter((his: any) => his.action == 'out').reduce((p: any, n: any) => {
        p += n.diff_hour
        console.log('p1', p);

        const result = times.filter((time: any) => time === p || time <= (p + 20));
        console.log(result);
        if (result?.length != 0) {
          if (result[result.length - 1] > p) {
            p = result.pop()
          }
        }
        console.log('p2', p);
        return p
      }, 0)
      // console.log("🚀 ~ total:", total)
      this.item.inspectionTime.forEach((item: any) => {
        if (item.at <= total) {
          item.pass = true
        } else {
          item.pass = false
        }
      });
      // const res2 = await this.$queue.update(this.item._id, this.item).toPromise()
    } else {
      this.item.inspectionTime.forEach((item: any) => {
        item.pass = false
      });
      console.log(this.item.inspectionTime);

    }


    // let remain_hour: number = this.item.total_hour
    // for (let i = 0; i < this.item.inspectionTime.length; i++) {
    //   const inspecItem = this.item.inspectionTime[i];
    //   if (
    //     (remain_hour - parseFloat(inspecItem.at)) >= 0
    //   ) {
    //     inspecItem.pass = true
    //   }
    // }
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
      }, 500);
    }
  }


  // handleScan(e: any, value: string, inspec: any, item: any, action: string) {
  //   try {
  //     const key = e.keyCode
  //     if (key === 13 || key === 9) {
  //       this.onPass(value, inspec, item, action)
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ error:", error)
  //   }
  // }
  // onPass(value: string, inspec: any, item: any, action: string) {
  //   let val = value?.trim()
  //   if (val) {
  //     if (this.equipments.some((eq: any) => eq.name == val)) {
  //       const newItem = {
  //         code: val,
  //         scanDate: new Date(),
  //         at: inspec.at,
  //         runNo: this.item.work.controlNo,
  //         condition: this.item.condition,
  //         status: ''
  //       }
  //       item.scannerInput = null
  //       if (action == 'in') {
  //         this.scanIn(inspec, newItem)
  //       }
  //       if (action == 'out') {
  //         this.scanOut(inspec, newItem)
  //       }
  //       // this.validateInOut(inspec, newItem)
  //     } else {
  //       alert('not found')
  //     }
  //   }
  // }
  // clearScan(item: any) {
  //   setTimeout(() => {
  //     item.scannerInput = null
  //     // this.sub1.unsubscribe()
  //   }, 100);
  // }

  // trackingScan(item: any) {
  //   item.scannerInput = null
  // }

  // scanIn(item: any, newItem: any) {

  // }
  // scanOut(item: any, newItem: any) {
  //   if (item.input.find((a: any) => a.code == newItem.code)) {

  //   }
  // }

  // validateInOut(item: any, newItem: any) {
  //   if (item.input.find((a: any) => a.code == newItem.code)) {
  //     if (!item.output.find((a: any) => a.code == newItem.code)) {
  //       newItem['status'] = 'out'
  //       this.createNewHistory(newItem)
  //       item.output.push(newItem)
  //     } else {
  //       alert('full')
  //     }
  //   } else {
  //     newItem['status'] = 'in'
  //     item.input.push(newItem)
  //     this.createNewHistory(newItem)
  //   }
  // }

  // async createNewHistory(newItem: any) {
  //   try {
  //     const res1 = await this.$scanHistory.insert(newItem).toPromise()
  //   } catch (error) {
  //     console.log("🚀 ~ error:", error)
  //   }
  // }

  // onClickInDelete(i_inspec: number, i_input: number, inp: any) {
  //   Swal.fire({
  //     title: "Delete ?",
  //     icon: 'question',
  //     showCancelButton: true
  //   }).then(async (v: SweetAlertResult) => {
  //     if (v.isConfirmed) {
  //       let input: any = this.item.inspectionTime[i_inspec].input
  //       let output: any = this.item.inspectionTime[i_inspec].output
  //       input = input.filter((aa: any, i: number) => i != i_input && aa.code != inp.code)
  //       output = output.filter((aa: any, i: number) => i != i_input && aa.code != inp.code)
  //       this.item.inspectionTime[i_inspec].input = input
  //       this.item.inspectionTime[i_inspec].output = output

  //       let param: HttpParams = new HttpParams().set('code', inp.code)
  //       await lastValueFrom(this.$scanHistory.deleteAllByCode(param))
  //       Swal.fire({
  //         title: 'Success',
  //         icon: 'success',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   })
  // }
  // onClickOutDelete(i_inspec: number, i_output: number, out: any) {
  //   Swal.fire({
  //     title: "Delete ?",
  //     icon: 'question',
  //     showCancelButton: true
  //   }).then(async (v: SweetAlertResult) => {
  //     if (v.isConfirmed) {
  //       let output: any = this.item.inspectionTime[i_inspec].output
  //       output = output.filter((aa: any, i: number) => i != i_output && aa.code != out.code)
  //       this.item.inspectionTime[i_inspec].output = output

  //       let param: HttpParams = new HttpParams().set('code', out.code).set('status', 'out')
  //       await lastValueFrom(this.$scanHistory.deleteByCode(param))
  //       Swal.fire({
  //         title: 'Success',
  //         icon: 'success',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   })
  // }

}
