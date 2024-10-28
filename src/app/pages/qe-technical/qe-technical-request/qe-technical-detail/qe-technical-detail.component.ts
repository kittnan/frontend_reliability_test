import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { QueueService } from 'src/app/http/queue.service';
import { ScanHistoryHttpService } from 'src/app/http/scan-history-http.service';

@Component({
  selector: 'app-qe-technical-detail',
  templateUrl: './qe-technical-detail.component.html',
  styleUrls: ['./qe-technical-detail.component.scss']
})
export class QeTechnicalDetailComponent implements OnInit {

  @Input() index!: number
  @Input() item: any;
  @Input() equipments: any;
  @Input() formInput: any;

  historyScan: any = []
  inputText = ''
  outputText = ''

  inputId: any = ''

  constructor(
    private $scanHistory: ScanHistoryHttpService,
    private $queue: QueueService

  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let p0: HttpParams = new HttpParams()
      p0 = p0.set('runNo', JSON.stringify([this.item.work.controlNo]))
      p0 = p0.set('conditionValue', JSON.stringify([this.item.condition.value]))
      p0 = p0.set('conditionName', JSON.stringify([this.item.condition.name]))
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
      if (e.key == 'Enter' || e.key == 'Tab') {
        let value: string = e.target.value
        value = value.trim()
        e.preventDefault();
        if (!value) throw 'Code not correct'
        if (!this.equipments.some((eq: any) => eq.name == value)) throw 'Code not correct'

        const stage = this.item.inspectionTime.filter((a: any) => !a.pass).sort((a: any, b: any) => a.at - b.at)[0]
        if (!stage) throw 'no stage match'
        const scanNow = {
          code: value,
          scanDate: new Date(),
          scanDateLocal: moment().toLocaleString(),
          stage: stage.at,
          runNo: this.item.work.controlNo,
          condition: this.item.condition,
          action: action,
          diff_hour: 0,
          diff_min: 0,
          total_hour: 0,
        }

        if (this.item.scans && this.item.scans.length != 0) {
          const lastItem = this.item.scans.filter((scan: any) => scan.code == value).pop()
          if (lastItem?.action != action) {
            this.scanHistory(scanNow, action)
          } else {
            alert('Please Scan Out')
            this.clearInputAndFocus(inputId)
          }

        } else {
          this.scanNoHistory(scanNow, action, stage)
        }



        // const scan = {
        //   code: value,
        //   scanDate: new Date(),
        //   scanDateLocal: moment().toLocaleString(),
        //   // at: inspec.at,
        //   runNo: this.item.work.controlNo,
        //   condition: this.item.condition,
        //   action: action,
        //   diff_hour: 0,
        //   diff_min: 0,
        //   total_hour: 0,
        // }
        // if (action == 'in') {
        //   if (this.item.scans && this.item.scans.length != 0) { // ! have scans history
        //     const lastItem = this.item.scans.filter((scan: any) => scan.code == value).pop()
        //     if (lastItem?.action != action) {
        //       this.item.scans.push(scan)
        //       const res1 = await this.$scanHistory.insert(scan).toPromise()
        //       this.clearInputAndFocus(inputId)
        //     } else {
        //       alert('Please Scan Out')
        //       this.clearInputAndFocus(inputId)
        //     }

        //   } else { // ! no have scans history
        //     this.item.scans = [scan]
        //     const res1 = await this.$scanHistory.insert(scan).toPromise()
        //     this.clearInputAndFocus(inputId)
        //   }
        // }
        // if (action == 'out') {
        //   // scan.scanDate = moment(scan.scanDate).add('second', 360000).toDate() //! for test
        //   if (this.item.scans && this.item.scans.length != 0) {
        //     const lastItem = this.item.scans.filter((scan: any) => scan.code == value).pop()
        //     if (lastItem?.action != action) {
        //       let diff: number = moment(scan.scanDate).diff(lastItem.scanDate, 'second')
        //       const diffObj = this.convertSecondsToHoursAndMinutes(diff)

        //       scan.diff_hour = diffObj.hours
        //       scan.diff_min = diffObj.minutes


        //       this.item.scans.push(scan)
        //       this.item.total_hour = this.item.scans.reduce((p: any, n: any) => {
        //         if (n.action == 'out') {
        //           p += n.diff_hour
        //         }
        //         return p
        //       }, 0)
        //       scan.total_hour = this.item.total_hour
        //       const res1 = await this.$scanHistory.insert(scan).toPromise()

        //       const res2 = await this.$queue.update(this.item._id, this.item).toPromise()
        //       this.clearInputAndFocus(inputId)
        //     } else {
        //       alert('Please Scan In')
        //       this.clearInputAndFocus(inputId)
        //     }

        //   } else {
        //     this.item.scans = [scan]
        //     const res1 = await this.$scanHistory.insert(scan).toPromise()
        //     const res2 = await this.$queue.update(this.item._id, this.item).toPromise()
        //     this.clearInputAndFocus(inputId)
        //   }
        //   this.loopPassInspec()
        // }
      }
    } catch (error) {
      alert(error)
      this.clearInputAndFocus(inputId)
      console.log("🚀 ~ error:", error)
    }
  }

  scanHistory(scanNow: any, action: any) {
    if (action === 'in') {
      this.scanHistoryIn(scanNow)
    } else
      if (action === 'out') {
        this.scanHistoryOut(scanNow)
      }
  }
  async scanHistoryIn(scanNow: any) {
    const res1 = await this.$scanHistory.insert(scanNow).toPromise()
    this.item.scans.push(scanNow)
    this.clearInputAndFocus(this.inputId)
  }
  scanHistoryOut(scanNow: any) {
    // console.clear()
    // scanNow.scanDate = moment(scanNow.scanDate).add('second', 360000).toDate() //! for test
    // const lastItem = this.item.scans.filter((scan: any) => scan.code == scanNow.code && scan.action === 'in').pop()
    // let diff: number = moment(scanNow.scanDate).diff(lastItem.scanDate, 'second')
    // const diffObj = this.convertSecondsToHoursAndMinutes(diff)
    // scanNow.diff_hour = diffObj.hours
    // scanNow.diff_min = diffObj.minutes

    // console.log(scanNow);
    // console.log(this.item);

    // const stage = this.item.inspectionTime.filter((a: any) => !a.pass).sort((a: any, b: any) => a.at - b.at)[0]
    // console.log("🚀 ~ stage:", stage)

    // if (scanNow.diff_hour >= stage.at) {
    //   stage.pass = true
    //   scanNow.total_hour = stage.at
    //   // todo stage pass
    // } else if ((scanNow.diff_hour + 20) >= stage.at) {
    //   stage.pass = true
    //   scanNow.total_hour = stage.at
    //   // todo stage pass
    // } else {

    // }
  }

  async scanNoHistory(scanNow: any, action: any, stage: any) {
    if (action === 'in') {
      console.log(this.item);
      if (stage.at === 0) {
        stage.pass = true
        const res1 = await this.$scanHistory.insert(scanNow).toPromise()
        this.item.scans.push(scanNow)
        const res2 = await this.$queue.update(this.item._id, this.item).toPromise()
        this.clearInputAndFocus(this.inputId)
      } else {
        const res1 = await this.$scanHistory.insert(scanNow).toPromise()
        this.item.scans.push(scanNow)
        this.clearInputAndFocus(this.inputId)
      }


    } else
      if (action === 'out') {
        alert('Please scan in')
        this.clearInputAndFocus(this.inputId)
      }
  }



  loopPassInspec() {
    console.log(this.item.scans);

    this.item.inspectionTime.map((inspec: any) => {
      console.log(inspec);

    })
    // let remain_hour: number = this.item.total_hour
    // for (let i = 0; i < this.item.inspectionTime.length; i++) {
    //   const inspecItem = this.item.inspectionTime[i];
    //   if (remain_hour > 0) {
    //     remain_hour -= parseFloat(inspecItem.at)
    //     if (remain_hour >= 0) {
    //       inspecItem.pass = true
    //     }
    //   }
    // }
  }

  convertSecondsToHoursAndMinutes(seconds: number) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
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
