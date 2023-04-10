import { RequestHttpService } from './../../../../http/request-http.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-daily-remain',
  templateUrl: './daily-remain.component.html',
  styleUrls: ['./daily-remain.component.scss']
})
export class DailyRemainComponent implements OnInit {
  @Input() dailyRemain: any
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  expandedRegions: { [key: string]: boolean } = {};
  data: any[] = []
  keepStage: any[] = []
  constructor(
  ) { }

  async ngOnInit(): Promise<void> {

  }

  // htmlTime(min: number) {
  //   let actionText = min < 0 ? 'ago' : 'more`'
  //   if (Math.abs(min) >= 60) {
  //     let str: any = (Math.abs(min) / 60).toFixed(2).toString()
  //     str = str.split('.')
  //     const h = str[0]
  //     let m: any = Math.ceil((Number(str[1]) / 10) * 6)
  //     return `${h}hr ${m}min ${actionText}`
  //   } else {
  //     return `${Math.abs(min)} min ${actionText}`
  //   }

  // }
  htmlPurpose(txt: string) {
    if (txt) {

      // let len = txt.length
      // if (len > 30) {
      //   const newTxt = txt.substring(0, 30)
      //   return newTxt + '...'
      // }
      return txt
    }
    return '-'
  }
  htmlUsername(username: string) {
    // console.log(username);

    let strSplit = username?.trim().split(' ')
    // console.log(strSplit);

    if (strSplit && strSplit.length != 0) return `${strSplit[0]}-${strSplit[strSplit.length - 1].split('')[0]}`
    return ''

  }
  htmlTimeCSS(min: number) {
    if (min < 0) return 'mat-yellow'
    return 'mat-primary'
  }
  htmlAt(at: number) {
    if (at === 0) return 'Initial'
    if (at) return `${at} HR`
    return ''
  }
  onClickExpand(i: any) {
    if (this.keepStage.length === 0) {
      this.keepStage = this.dailyRemain.map((d: any) => false)
      this.keepStage[i] = true
    } else {
      this.keepStage[i] = !this.keepStage[i]
    }

  }
  stageExpand(i: any) {
    return this.keepStage[i]
  }
  openAll() {
    this.accordion.openAll()
    if (this.keepStage.length === 0) {
      this.keepStage = this.dailyRemain.map((d: any) => true)
    } else {
      this.keepStage = this.keepStage.map((d: any) => true)
    }
  }
  closeAll() {
    this.accordion.closeAll()
    if (this.keepStage.length === 0) {
      this.keepStage = this.dailyRemain.map((d: any) => false)
    } else {
      this.keepStage = this.keepStage.map((d: any) => false)
    }
  }

}
