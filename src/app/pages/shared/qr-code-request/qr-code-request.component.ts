import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as qrCode from 'qrcode';
@Component({
  selector: 'app-qr-code-request',
  templateUrl: './qr-code-request.component.html',
  styleUrls: ['./qr-code-request.component.scss'],
})
export class QrCodeRequestComponent implements OnInit {
  request: any = null;
  constructor(
    private route: ActivatedRoute,
    private $request: RequestHttpService
  ) {}

  ngOnInit(): void {
    try {
      this.route.queryParams.subscribe(async (res) => {
        console.log(res);
        const id = res['id'];
        if (id) {
          const resData = await this.$request.get_id(id).toPromise();
          console.log('🚀 ~ resData:', resData);
          this.request = resData[0];
          let canvas = document.getElementById('canvas');
          qrCode.toCanvas(canvas, 'sample text', function (error) {
            if (error) console.error(error);
            console.log('success!');
          });
        }
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }

  handlePrint() {
    let el: any = document.getElementById('print');
    html2canvas(el).then((canvas) => {
      var imgData = canvas.toDataURL('image/png');
      var pdf: any = new jsPDF();
      const imgWidth = 210; // A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
      pdf.save('sample-file.pdf');
    });
  }
}
