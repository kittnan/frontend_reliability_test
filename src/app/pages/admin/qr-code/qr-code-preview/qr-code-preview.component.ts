import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode'
import { GenerateQrcodeService } from '../generate-qrcode.service';

@Component({
  selector: 'app-qr-code-preview',
  templateUrl: './qr-code-preview.component.html',
  styleUrls: ['./qr-code-preview.component.scss']
})
export class QrCodePreviewComponent implements OnInit {

  codes:any = null
  constructor(
    private route: ActivatedRoute,
    private $generate:GenerateQrcodeService
  ) { }

  ngOnInit(): void {
    try {
      this.route.queryParams.subscribe(async (p:any)=>{
        const code = JSON.parse(p['code'])
        let mapChamber = await code.map(async (a: any) => {
          return {
            code:a,
            qrcode:await QRCode.toDataURL(a)
          }
        })
        mapChamber = mapChamber.map((a: any) => {
          return a['__zone_symbol__value']
        })
        this.codes= mapChamber
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  handlePrint(){
    // let em = document.querySelectorAll('#print')
    // console.log("🚀 ~ em:", em)
    this.$generate.generate('foo')
  }

}
