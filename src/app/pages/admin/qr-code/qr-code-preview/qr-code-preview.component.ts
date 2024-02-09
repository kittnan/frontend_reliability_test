import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode'
import { GenerateQrcodeService } from '../generate-qrcode.service';
import * as moment from 'moment';

@Component({
  selector: 'app-qr-code-preview',
  templateUrl: './qr-code-preview.component.html',
  styleUrls: ['./qr-code-preview.component.scss']
})
export class QrCodePreviewComponent implements OnInit {

  codes: any = null
  date: string = moment().format('DD/MM/YYYY')
  constructor(
    private route: ActivatedRoute,
    private $generate: GenerateQrcodeService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let qrStr: any = localStorage.getItem('RLS_qr')
      qrStr = qrStr ? JSON.parse(qrStr) : null
      if (qrStr) {
        let mapChamber = await qrStr.map(async (item: any) => {
          return {
            ...item,
            code: item.code,
            qrcode: await QRCode.toDataURL(item.code)
          }
        })
        mapChamber = mapChamber.map((a: any) => {
          return a['__zone_symbol__value']
        })
        this.codes = mapChamber
      }
      // this.route.queryParams.subscribe(async (p: any) => {
      //   const data = JSON.parse(p['code'])
      //   let mapChamber = await data.map(async (item: any) => {
      //     return {
      //       ...item,
      //       code: item.code,
      //       qrcode: await QRCode.toDataURL(item.code)
      //     }
      //   })
      //   mapChamber = mapChamber.map((a: any) => {
      //     return a['__zone_symbol__value']
      //   })
      //   this.codes = mapChamber
      //   console.log("🚀 ~ this.codes:", this.codes)
      // })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  handlePrint() {
    // let em = document.querySelectorAll('#print')
    // console.log("🚀 ~ em:", em)
    this.$generate.generate('equipment_tags')
  }

}
