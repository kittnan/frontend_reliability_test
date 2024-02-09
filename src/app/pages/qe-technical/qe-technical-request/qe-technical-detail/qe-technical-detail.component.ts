import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { ScanHistoryHttpService } from 'src/app/http/scan-history-http.service';

@Component({
  selector: 'app-qe-technical-detail',
  templateUrl: './qe-technical-detail.component.html',
  styleUrls: ['./qe-technical-detail.component.scss']
})
export class QeTechnicalDetailComponent implements OnInit {

  @Input() index!: number
  @Input() item: any;
  @Input() formInput: any;
  @Input() trackingOperate: any;


  scannerInput: any = null
  startDelay: boolean = false

  observe!: Observable<any>
  sub1!: Subscription

  ctrState: boolean = false

  constructor(
    private $scanHistory: ScanHistoryHttpService,

  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const intervalTime = 200
      this.observe = interval(intervalTime)
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }

  }

  handleScan(e: any, value: string, item: any) {
    try {
      let notPass = [17]
      const key = e.keyCode

      if (this.ctrState && key === 86) {
        this.clearScan(item)
        this.ctrState = false
      } else {
        if (notPass.some((np: number) => np !== key)) {
          if (key === 13 || key === 9) {
            this.sub1.unsubscribe()
            this.onPass(value, item)
          } else {
            if (!this.sub1 || this.sub1?.closed) {
              this.sub1 = this.observe.subscribe(() => this.clearScan(item))
            }
          }
        } else {
          this.ctrState = true
          this.clearScan(item)
        }
      }



      // this.startDelay = true
      // if ((e.keyCode === 13 || e.keyCode === 9) || e.keyCode != 17) {
      //   let val = value.trim()
      //   if (val) {
      //     this.startDelay = false
      //     setTimeout(() => {
      //       const newItem = {
      //         code: val,
      //         scanDate: new Date(),
      //         at: item.at,
      //         runNo: this.item.work.controlNo,
      //         condition: this.item.condition,
      //         status: ''
      //       }
      //       item.scannerInput = null
      //       this.validateInOut(item, newItem)


      //     }, 200);
      //   }

      // } else {
      //   setTimeout(() => {
      //     if (this.startDelay || e.keyCode == 17) {
      //       alert('not scanner')
      //       item.scannerInput = null
      //     }
      //   }, 1000);
      // }


    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onPass(value: string, item: any) {
    let val = value?.trim()
    if (val) {
      if (this.trackingOperate.some((operate: any) => operate.code == value)){
        const newItem = {
          code: val,
          scanDate: new Date(),
          at: item.at,
          runNo: this.item.work.controlNo,
          condition: this.item.condition,
          status: ''
        }
      item.scannerInput = null
      this.validateInOut(item, newItem)
      }else{
        alert('not found')
      }
    }
  }
  clearScan(item: any) {
    setTimeout(() => {
      item.scannerInput = null
      this.sub1.unsubscribe()
    }, 100);
  }

  trackingScan(item: any) {
    item.scannerInput = null
  }

  validateInOut(item: any, newItem: any) {
    if (item.input.find((a: any) => a.code == newItem.code)) {
      if (!item.output.find((a: any) => a.code == newItem.code)) {
        newItem['status'] = 'out'
        this.createNewHistory(newItem)
        item.output.push(newItem)
      } else {
        alert('full')
      }
    } else {
      newItem['status'] = 'in'
      item.input.push(newItem)
      this.createNewHistory(newItem)
    }
  }

  async createNewHistory(newItem: any) {
    try {
      const res1 = await this.$scanHistory.insert(newItem).toPromise()
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}
