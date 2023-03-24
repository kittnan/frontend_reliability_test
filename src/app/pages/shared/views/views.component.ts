import { FilesHttpService } from 'src/app/http/files-http.service';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'ExcelJs';
import { Cell, Row, Workbook, Worksheet } from 'ExcelJs';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  @Input() formInput: any
  @Input() show1: any = true
  @Input() show2: any = true
  @Input() show3: any = true
  @Input() show4: any = true
  @Input() show5: any = true
  @Input() showComment: any = true
  @Input() showTest: any = true
  @Input() showReport: any = true
  form: any;
  step1: any
  step2: any
  step3: any
  step4: any
  step5: any

  imgs: any = []


  constructor(
    private _loading: NgxUiLoaderService,
    private http: HttpClient,
    private $file: FilesHttpService
  ) { }

  ngOnInit(): void {
    this.form = this.formInput;
    console.log("🚀 ~ this.form:", this.form)

    if (this.form) {
      this.step1 = this.form.step1
      this.step2 = this.form.step2
      this.step3 = this.form.step3
      this.step4 = this.form.step4
      this.step5 = this.form.step5

    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
      // this.foo()
    }, 500);
  }
  onClick() {
    this.form = {
      step1: this.step1,
      step2: this.step2,
      step3: this.step3,
      step4: this.step4,
    }
  }

  async loopBase64(files: any, wb: Workbook, ws: Worksheet) {
    let arr = []
    let row = 4
    let col = 11
    for (let i = 0; i < files.length; i++) {
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
    return arr
  }

  async genReportExcel() {
    this.http.get('/assets/request.xlsx', { responseType: "arraybuffer" }).subscribe(res => {
      const wb = new Workbook()
      const arrayBuffer = new Response(res).arrayBuffer();
      arrayBuffer.then(async (buff: any) => {
        await wb.xlsx.load(buff)
        const ws1 = wb.getWorksheet('Sheet1')
        this.setRequest(ws1)
        const imgId = await this.loopBase64(this.step1.files, wb, ws1)
        // console.log("🚀 ~ imgId:", imgId)

        const ws3: Worksheet = wb.addWorksheet('Sheet3')
        this.setSheet3(ws3)

        wb.xlsx.writeBuffer().then(excelData => {
          const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          // console.log("🚀 ~ blob:", blob)
          const name = new Date().getTime() + '.xlsx'
          saveAs(blob, name)
        })

        setTimeout(() => {
        }, 2000);
      })
    })

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

    ws.getCell('H40').value = this.step4.data[0].dataTable.inspectionDetail.name + ' ' + ws.getCell('H40').value
    ws.getCell('H41').value = this.step4.data[0].dataTable.inspectionDetail.detail

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

  // * Sheet 3
  setSheet3(ws: Worksheet) {
    ws.addRows(
      [
        ['Over All Plan Reliability Test'],
        ['Control No.', this.form.step1.controlNo],
        ['Model No.', 'Model Name', 'Requestor'],
        [this.form.step1.modelNo, this.form.step1.modelName, this.form.step5[0].prevUser.name]

      ]
    )
    const header = ['Condition'].concat(this.form.table.header)
    ws.addRows([header])
    const foo = this.form.table.data.map((d: any, i: number) => {
      return d.map((d1: any) => {
        if (d1 && d1.length > 0) {
          return d1.reduce((p: any, n: any) => {
            p += `\n${n}`
            return p
          }, '')
        } else {
          return ''
        }

      })

    })

    // for (let i = 0; i < this.form.table.data.length; i++) {
    ws.addRows(foo)
    // }
  }

}
