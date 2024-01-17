import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as ExcelJS from 'ExcelJs';
import { Cell, Row, Workbook, Worksheet } from 'ExcelJs';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

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
      console.log(wb);

      const arrayBuffer = new Response(res).arrayBuffer();
      arrayBuffer.then(async (buff: any) => {
        await wb.xlsx.load(buff)

        const ws1 = wb.getWorksheet('Cover')
        console.log("🚀 ~ ws1:", ws1)


        ws1.getCell('G8').value = request.step1.customer
        ws1.getCell('G9').value = request.step1.modelNo
        ws1.getCell('G10').value = request.step1.modelName
        ws1.getCell('G11').value = request.step1.size
        ws1.getCell('G13').value = request.step1.controlNo
        ws1.getCell('G14').value = request.step5[0].prevUser.name
        ws1.getCell('G15').value = moment(request.step1.requestDate).format('DD-MMM-YY')
        ws1.getCell('G16').value = moment(request.qeReceive.date).format('DD-MMM-YY')
        ws1.getCell('G22').value = moment(request.step1.sampleSentToQE_withinDate).format('DD-MMM-YY')
        ws1.getCell('G29').value = request.step1.modelName

        ws1.getCell('D21').value = request.step2.purpose
        ws1.getCell('G21').value = request.step2.description.value

        // ws1.getCell('D17').value = '✔'
        // ws1.getCell('D18').value = '✔'
        // ws1.getCell('D19').value = '✔'
        // ws1.getCell('D20').value = '✔'

        // ws1.getCell('I17').value = '✔'
        // ws1.getCell('I18').value = '✔'
        // ws1.getCell('I19').value = '✔'
        // ws1.getCell('I20').value = '✔'

        // ws1.getCell('O17').value = '✔'
        // ws1.getCell('O18').value = '✔'
        // ws1.getCell('O19').value = '✔'
        // ws1.getCell('O20').value = '✔'

        const startConditionRow = ws1.getRow(36)
        for (let i = 0; i < request.step4.data.length; i++) {
          const condition = request.step4.data[i];
          const row = ws1.getRow(startConditionRow.number + i)
          row.eachCell((cell: ExcelJS.Cell, colNum: number) => {

            if (colNum === 2) {
              cell.value = condition.data.sample
            }
            if (colNum === 4) {
              cell.value = condition.dataTable.name
            }
            if (colNum === 12) {
              cell.value = condition.data.inspection
            }
            // if(colNum===15){
            //   cell.value = condition.data.inspection
            // }
          })
        }
        const deleteRowNum = 36 + request.step4.data.length
        const diffDeleteRowNum = 10 - request.step4.data.length

        ws1.getRows(deleteRowNum, diffDeleteRowNum)?.map((row: ExcelJS.Row) => {
          row.values = []
        })

        ws1.getCell('A56').value = request.step5[0].prevUser.name
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
