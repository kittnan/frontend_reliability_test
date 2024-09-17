import { environment } from 'src/environments/environment';
import { Sheet3Service } from './sheet3.service';
import { Sheet2Service } from './sheet2.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as ExcelJS from 'ExcelJs';
import { Cell, Row, Workbook, Worksheet } from 'ExcelJs';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { WorkSheet } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  form: any
  step1: any
  step2: any
  step3: any
  step4: any
  step5: any
  imgs: any = []

  URL = environment.API
  constructor(
    private _loading: NgxUiLoaderService,
    private http: HttpClient,
    private $file: FilesHttpService,
    private sheet2: Sheet2Service,
    private sheet3: Sheet3Service,
  ) { }



  async genReportExcel(form: any) {
    try {
      this.form = form
      this.step1 = form.step1
      this.step2 = form.step2
      this.step3 = form.step3
      this.step4 = form.step4
      this.step5 = form.step5
      this.http.get('./assets/excel/report.xlsx', { responseType: "arraybuffer" }).subscribe(res => {
        const wb = new Workbook()
        const arrayBuffer = new Response(res).arrayBuffer();
        arrayBuffer.then(async (buff: any) => {
          await wb.xlsx.load(buff)
          const ws1 = wb.getWorksheet('Request')
          this.setRequest(ws1)
          await this.loopBase64(this.step1.files, wb, ws1)

          // * add sheet 2
          const ws2: Worksheet = wb.addWorksheet('Work', { views: [{ showGridLines: false }] })
          this.sheet2.setSheet2(ws2, form)
          ws2.insertRow(5, ['INSPECTION & REPORT RESULT'])
          this.sheet2.setStyleW2(ws2)

          ws2.columns.forEach(function (column: any, i: any) {
            var maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function (cell: any) {
              var columnLength = cell.value ? cell.value.toString().length : 10;
              if (columnLength > maxLength) {
                maxLength = columnLength;
              }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
          });

          // * add sheet 3
          const ws3: Worksheet = wb.addWorksheet('Job', { views: [{ showGridLines: false }] })
          this.sheet3.setSheet3(ws3, form)
          this.sheet3.setStyleW3(ws3)

          ws3.columns.forEach(function (column: any, i: any) {
            var maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function (cell: any) {
              var columnLength = cell.value ? cell.value.toString().length : 10;
              if (columnLength > maxLength) {
                maxLength = columnLength;
              }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
          });

          const ws4: Worksheet = wb.getWorksheet('Cover')
          this.setCover(ws4)



          wb.xlsx.writeBuffer().then(excelData => {
            const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            const name = form.step1.controlNo + '_' + new Date().getTime() + '.xlsx'
            saveAs(blob, name)
          })

          setTimeout(() => {
            this._loading.stopAll()
          }, 500);
        })
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }


  }

  async loopBase64(files: any, wb: Workbook, ws: Worksheet) {
    let arr = []
    let row = 4
    let col = 11
    for (let i = 0; i < files.length; i++) {
      const foo = files[i].name.split('.')
      if (foo[foo.length - 1] != 'png' && foo[foo.length - 1] != 'jpg') {
        ws.getCell(row, col).value = files[i].path
        row += 1
      } else {
        const base64Str: any = await lastValueFrom(this.$file.base64(files[i].path))
        this.imgs.push(base64Str.data)

        const temp_id = wb.addImage({
          base64: base64Str.data,
          extension: 'png',
        });
        arr.push(temp_id)
        ws.addImage(temp_id, {
          tl: { col: col, row: row },
          ext: { width: 384, height: 192 }
        });
        row += 7
      }


    }
    return arr
  }


  setRequest(ws: Worksheet) {
    ws.getCell('L1').value = this.step1.controlNo
    ws.getCell('G3').value = this.step1.requestStatus?.toUpperCase()
    ws.getCell('G4').value = this.step1.department?.toUpperCase()
    ws.getCell('G5').value = this.step1.requestDate ? moment(this.step1.requestDate).format('D-MMM-YY') : ''
    ws.getCell('G6').value = this.step1.concernShipmentDate ? moment(this.step1.concernShipmentDate).format('D-MMM-YY') : ''
    ws.getCell('G7').value = this.step1.inputToProductionDate ? moment(this.step1.inputToProductionDate).format('D-MMM-YY') : ''
    ws.getCell('G8').value = this.step1.concernCustomerDate ? moment(this.step1.concernCustomerDate).format('D-MMM-YY') : ''
    ws.getCell('G9').value = this.step1.reportRequireDate ? moment(this.step1.reportRequireDate).format('D-MMM-YY') : ''
    ws.getCell('G10').value = this.step1.sampleSentToQE_withinDate ? moment(this.step1.sampleSentToQE_withinDate).format('D-MMM-YY') : ''
    ws.getCell('G11').value = this.step1.modelNo
    ws.getCell('G12').value = this.step1.modelName
    ws.getCell('G13').value = this.step1.lotNo
    ws.getCell('G14').value = this.step1.size
    ws.getCell('G15').value = this.step1.customer
    ws.getCell('G16').value = this.step1.sampleDescription

    ws.getCell('C21').value = this.step2.purpose + ': ' + this.step2.description.value


    this.setTestingType(ws)
    this.setTestingCondition(ws)

    ws.getCell('H40').value = this.step4?.data[0]?.dataTable?.inspectionDetail?.name + ' ' + ws.getCell('H40').value
    ws.getCell('H41').value = this.step4?.data[0]?.dataTable?.inspectionDetail?.detail

    this.setApprover(ws)

    // ws.addImage()
  }

  setTestingType(ws: Worksheet) {
    const testingType = this.step3.data.filter((d: any) => d.checked)
    testingType.map((test: any, index: number) => {
      const indexNum = 32 + index
      const address = 'C' + indexNum
      ws.getCell(address).value = test.list.reduce((p: any, n: any) => {
        p += n.checked ? `${n.name} ${n.description.status ? `( ${n.description.value} )` : ''}, ` : ''
        return p
      }, test.groupName + '➝ ')
    })

  }

  setTestingCondition(ws: Worksheet) {
    this.step4.data.map((data: any, index: number) => {
      const indexNum = 41 + index
      const address_Item = 'B' + indexNum
      ws.getCell(address_Item).value = index + 1

      const address_Test = 'C' + indexNum
      ws.getCell(address_Test).value = data?.dataTable?.name || ''

      const address_Operate = 'F' + indexNum
      ws.getCell(address_Operate).value = data?.dataTable?.operate?.text || ''

      const address_Inspection = 'L' + indexNum
      ws.getCell(address_Inspection).value = data?.dataTable?.inspection ? this.setFormatInspection(data.dataTable.inspection) : ''

      const address_Report = 'O' + indexNum
      ws.getCell(address_Report).value = data?.dataTable?.report ? this.setFormatInspection(data.dataTable.report) : ''

      const address_SampleNo = 'Q' + indexNum
      ws.getCell(address_SampleNo).value = data?.dataTable?.sample || ''

      const address_Qty = 'R' + indexNum
      ws.getCell(address_Qty).value = data?.dataTable?.qty || ''

    })
  }

  setFormatInspection(ar: any[]) {
    return ar.reduce((p: any, n: any) => {
      if (n == '0') {
        p += 'Initial'
      } else {
        p += ', ' + n
      }
      return p
    }, '')
  }

  setApprover(ws: Worksheet) {
    const user_1 = this.step5.find((s: any) => s.level == 1)
    const user_2 = this.step5.find((s: any) => s.level == 2)
    const user_3 = this.step5.find((s: any) => s.level == 3)
    const user_4 = this.step5.find((s: any) => s.level == 4)
    const user_5 = this.step5.find((s: any) => s.level == 5)
    const user_6 = this.step5.find((s: any) => s.level == 6)
    const user_7 = this.step5.find((s: any) => s.level == 7)

    ws.getCell('B58').value = user_1 ? user_1.prevUser.name : ''
    ws.getCell('E58').value = user_2 ? user_2.prevUser.name : ''
    ws.getCell('H58').value = user_3 ? user_3.prevUser.name : ''
    ws.getCell('K58').value = user_4 ? user_4.prevUser.name : ''
    ws.getCell('N58').value = user_5 ? user_5.prevUser.name : ''

    ws.getCell('C60').value = user_1?.date ? moment(user_1.date).format('D-MMM-YY') : ''
    ws.getCell('F60').value = user_1?.date ? moment(user_1.date).format('D-MMM-YY') : ''
    ws.getCell('I60').value = user_1?.date ? moment(user_1.date).format('D-MMM-YY') : ''
    ws.getCell('L60').value = user_1?.date ? moment(user_1.date).format('D-MMM-YY') : ''
    ws.getCell('O60').value = user_1?.date ? moment(user_1.date).format('D-MMM-YY') : ''

    ws.getCell('B64').value = user_6 ? user_6.prevUser.name : ''
    ws.getCell('E64').value = user_7 ? user_7.prevUser.name : ''

    ws.getCell('C66').value = user_6?.date ? moment(user_6.date).format('D-MMM-YY') : ''
    ws.getCell('F66').value = user_7?.date ? moment(user_7.date).format('D-MMM-YY') : ''


  }

  setCover(ws: Worksheet) {
    ws.getCell('G8').value = this.step1.customer
    ws.getCell('G9').value = this.step1.modelNo
    ws.getCell('G10').value = this.step1.modelName
    ws.getCell('G11').value = this.step1.size
    ws.getCell('G13').value = this.step1.controlNo
    ws.getCell('G14').value = this.step5[0].prevUser.name
    ws.getCell('G15').value = moment(this.step1.requestDate).format('DD-MMM-YY')
    ws.getCell('G16').value = moment(this.form.qeReceive.date).format('DD-MMM-YY')
    ws.getCell('G17').value = this.step2.purpose
    ws.getCell('G22').value = this.step1.requestSubject
    ws.getCell('G29').value = this.step1.modelName

    ws.getCell('G21').value = this.step2.description.value

    const startConditionRow = ws.getRow(36)
    for (let i = 0; i < this.form.step4.data.length; i++) {
      const condition = this.form.step4.data[i];
      const row = ws.getRow(startConditionRow.number + i)
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
    const deleteRowNum = 36 + this.form.step4.data.length
    const diffDeleteRowNum = 10 - this.form.step4.data.length

    ws.getRows(deleteRowNum, diffDeleteRowNum)?.map((row: ExcelJS.Row) => {
      row.values = []
    })
    ws.getCell('A56').value = this.form.step5[0].prevUser.name

  }



}
