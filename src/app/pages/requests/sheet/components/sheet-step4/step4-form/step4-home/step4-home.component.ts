import { HttpParams } from '@angular/common/http';
import { Step3HttpService } from './../../../../../../../http/step3-http.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';
import Swal, { SweetAlertResult } from 'sweetalert2';

interface ConditionListForm {
  name: string,
  value: number,
  disable?: boolean
}
@Component({
  selector: 'app-step4-home',
  templateUrl: './step4-home.component.html',
  styleUrls: ['./step4-home.component.scss']
})
export class Step4HomeComponent implements OnInit {

  @Input() formId: any
  @Input() conditionForm: any
  @Output() conditionFormChange = new EventEmitter();

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  conditionList!: ConditionListForm[]
  selected: any = 0;
  conditions: any[] = [];
  allExpandStatus: boolean = true;

  inspection: any = {
    name: '',
    detail: '',

  }
  constructor(
    private $master: MasterHttpService,
    private $step3: Step3HttpService
  ) {

  }

  async ngOnInit(): Promise<void> {
    const params: HttpParams = new HttpParams().set('requestId', this.formId)
    const step3 = await this.$step3.get(params).toPromise()
    let step3ListSelected = []
    if (step3.length > 0) {
      step3ListSelected = step3[0].data[0].list
    }

    this.conditionList = await this.$master.getFunctionChamber().toPromise()
    this.conditionList = this.conditionList.map((con: ConditionListForm) => {
      return {
        ...con,
        disable: false
      }
    })
    if (this.conditionForm) {
      this.conditions = this.conditionForm
      this.inspection = this.conditionForm[0]?.data.inspectionDetail ? this.conditionForm[0].data.inspectionDetail : this.inspection
      this.emit()
    }
  }

  checkDisable(item: ConditionListForm, step3ListSelected: any[]) {

    if (item.value == 1) {
      alert('1')
      const foo = step3ListSelected.find((foo: any) => foo.name.toLowerCase().includes('low'))
      if (foo) return false
      return true
    } else
      if (
        item.value == 2 ||
        item.value == 3 ||
        item.value == 4
      ) {
        alert('234')

        if (step3ListSelected.find((foo: any) => foo.name.toLowerCase().includes('high temp'))) return false
        return true
      } else
        if (item.value == 5) {
          alert('5')

          if (step3ListSelected.find((foo: any) =>
            foo.name.toLowerCase().includes('high') &&
            foo.name.toLowerCase().includes('low')
          )) return false
          return true
        } else
          if (item.value == 6) {
            alert('6')

            if (step3ListSelected.find((foo: any) => foo.name.toLowerCase().includes('shock'))) return false
            return true
          } else {
            return true
          }
  }

  async onSelected() {
    this.conditions.push({
      ...this.selected, data: {
        lowTemp: {
          temp: '0',
          tempVar: '0'
        },
        highTemp: {
          temp: '0',
          tempVar: '0'
        },
        operate: {
          text: 'operate',
          value: true
        },
        sample: '',
        qty: '',
        inspection: [0],
        report: [0],
        humi: '0',
        frequency: {
          high: '0',
          low: '0'
        },
        acceleration: '0',
        time: '0',
        cycle: '0',
        direction: {
          x: '0',
          y: '0',
          z: '0'
        },
        inspectionDetail: {
          name: 'normal',
          value: ''
        }
      }, inspectionDetail: {}
    })
    this.emit()
    setTimeout(() => {
      this.selected = 0;
    }, 100);

  }

  async dataChange(e: any, con: any) {
    con.data = e
    this.emit()
  }

  async onInspectionDetail() {
    this.emit()
  }

  async onUpdateTable() {
    this.emit()
  }

  async emit() {
    const dataEmit = await this.mapData(this.conditions, this.inspection)
    this.conditionFormChange.emit(dataEmit)
  }


  onDelete(item: any) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.conditions = this.conditions.filter((c: any) => c != this.conditions[item])
        this.emit()
      }
    })

  }

  mapData(conditions: any, inspection: any) {
    return new Promise(resolve => {
      const result = conditions.map((condition: any) => {
        const data = condition.data;
        data['inspectionDetail'] = inspection

        const sumStr = this.sumString(condition)

        const dataT = {
          name: sumStr || '',
          operate: data.operate,
          inspectionDetail: data.inspectionDetail,
          inspection: data.inspection,
          report: data.report,
          sample: data.sample,
          qty: data.qty
        }
        return {
          ...condition,
          dataTable: dataT,
          inspectionDetail:dataT.inspectionDetail
        }
      })
      resolve(result)
    })
  }

  sumString(condition: any) {
    const data: any = condition.data
    let sumStr: string = ''
    const lowTemp = data && data.lowTemp ? `${data.lowTemp.temp}±${data.lowTemp.tempVar}°C` : ''
    const highTemp = data && data.highTemp ? `${data.highTemp.temp}±${data.highTemp.tempVar}°C` : ''
    const acceleration = data && data.acceleration ? `Acceleration: ${data.acceleration}m/s2` : ''
    const cycle = data && data.cycle ? `${data.cycle}` : ''
    const time = data && data.time ? `${data.time}` : ''
    const timeCycle = cycle && time ? `Cycles: ${time}min(${cycle})` : ''
    const humi = data && data.humi ? `${data.humi}%RH` : ''
    const direction: any = data && data.direction ? `Direction: (${data.direction?.x},${data.direction?.y},${data.direction?.z})` : ''
    const frequency = data && data.frequency && data.frequency.low && data.frequency.high ? `Frequency: ${data.frequency.low}-${data.frequency.high}Hz` : ''
    if (condition && condition.value == 1) {
      sumStr += `${condition.name} ${lowTemp}`
    }
    if (condition && condition.value == 2) {
      sumStr += `${condition.name} ${highTemp}`
    }
    if (condition && condition.value == 3) {
      sumStr += `Damp proof test  ${highTemp} ${humi}`
    }
    if (condition && condition.value == 4) {
      sumStr += `${condition.name}  ${highTemp} ${humi} ${frequency} ${acceleration} ${timeCycle} ${direction}`
    }
    if (condition && condition.value == 5) {
      sumStr += `${condition.name} ${highTemp} ↔ ${lowTemp}`
    }
    if (condition && condition.value == 6) {
      sumStr += `${condition.name} ${lowTemp}↔${highTemp} ${timeCycle}`
    }
    return sumStr


  }

}
