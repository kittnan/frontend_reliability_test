import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-step4',
  templateUrl: './compare-step4.component.html',
  styleUrls: ['./compare-step4.component.scss']
})
export class CompareStep4Component implements OnInit {
  @Input() formRevise: any = null
  @Input() form: any = null
  step4: any = null
  data: any = null
  dataForm: any = null
  displayedColumns: string[] = ['item', 'condition', 'operate', 'inspectionDetail', 'inspection', 'report', 'sample', 'qty'];
  constructor() { }

  ngOnInit(): void {
    this.step4 = this.formRevise.step4
    this.data = this.step4.data
    this.dataForm = this.form.step4.data
    console.log(this.data, this.dataForm);

  }
  getRowSpan(action: string, index: number) {
    if (action == 'row') {
      if (index == 0) return this.data.length
      return 1
    }
    if (action == 'style') {
      if (index != 0) return false
      return true
    }
    return 1
  }
  trimStr(item: string) {
    return item.trim()
  }

  handleLabelColor(value: any, i: number, key: string) {
    if (this.form.step4.data[i]) {
      const dataTable = this.form.step4.data[i]['dataTable']
      const a = JSON.stringify(value)
      const b = JSON.stringify(dataTable[key])
      if (a !== b) return 'text-red'
      return ''
    } else {
      return ''
    }

  }

  handleLabelColor2(no: number) {
    if (no > this.form.step4.data.length) {
      return 'text-red'
    }
    return ''
  }

}
