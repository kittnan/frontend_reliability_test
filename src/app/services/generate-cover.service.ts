import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as ExcelJS from 'ExcelJs';
import { Cell, Row, Workbook, Worksheet } from 'ExcelJs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class GenerateCoverService {

  constructor(
    private http: HttpClient
  ) { }

  async generateCover(request: any) {
    try {
      console.log(request);

      const url = './assets/cover.xlsx';

      // Set responseType to 'blob' to handle binary data
      const res = await this.http.get(url, { responseType: 'arraybuffer' }).toPromise()
      const wb: Workbook = new Workbook()
      const arrayBuffer = new Response(res).arrayBuffer();
      arrayBuffer.then(async (buff: any) => {
        await wb.xlsx.load(buff)
        const ws1 = wb.getWorksheet('Cover')
        console.log("🚀 ~ ws1:", ws1)

        ws1.getCell('G8').value = "Input Customer"
        ws1.getCell('G9').value = "Input Model No"
        ws1.getCell('G10').value = "Input Model Name"
        ws1.getCell('G11').value = "Input Size"
        ws1.getCell('G13').value = "Input Control No"
        ws1.getCell('G14').value = "Input Requestor"
        ws1.getCell('G15').value = "Input Request Date"
        ws1.getCell('G16').value = "Input Receive Date"
        ws1.getCell('G22').value = "Input Sample Description"
        ws1.getCell('G29').value = "Input Model Name"
        ws1.getCell('A51').value = "Input Requestor"
    wb.xlsx.writeBuffer().then(excelData => {
        const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        saveAs(blob, `${new Date().getTime()}.xlsx`)
      })
      })

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
}
