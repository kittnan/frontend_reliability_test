import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable({
  providedIn: 'root'
})
export class GenerateQrcodeService {

  constructor(
    private $loader: NgxUiLoaderService
  ) { }

  async generate(name: string) {
    try {
      this.$loader.start()
      setTimeout(async () => {
        const div: any = document.querySelectorAll('#print');
        const options = {
          background: 'white',
          scale: 3,
        };
        var doc: any = new jsPDF('p', 'mm', 'a4');
        for (let index = 0; index < div.length; index++) {
          const d = div[index];
          const can = await html2canvas(d, options)
          let img = can.toDataURL('image/PNG');
          const bufferX = 5;
          const bufferY = 2;
          const imgProps = (<any>doc).getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          if (div.length === 1) {
            doc = await doc.addImage(
              img,
              'PNG',
              bufferX,
              bufferY,
              pdfWidth,
              pdfHeight,
              undefined,
              'FAST'
            );
            await doc.save(`${name}.pdf`);
            // this.router.navigate(['user/print'])
            this.$loader.stop()
          } else {
            if (index === 0) {
              doc = await doc.addImage(
                img,
                'PNG',
                bufferX,
                bufferY,
                pdfWidth,
                pdfHeight,
                undefined,
                'FAST'
              );
            } else {
              doc = await doc.addPage('a4', 'p');
              doc = await doc.addImage(
                img,
                'PNG',
                bufferX,
                bufferY,
                pdfWidth,
                pdfHeight,
                undefined,
                'FAST'
              );
              if (index + 1 === div.length) {
                await doc.save(`${name}.pdf`);
                // this.router.navigate(['user/print'])
                this.$loader.stop()
              }
            }
          }



        }
      }, 300);
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }

  }
}
