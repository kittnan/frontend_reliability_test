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
  @Input() conditionForm: any = []
  // tempConditionForm: any = []
  @Output() conditionFormChange = new EventEmitter();
  data: any[] = []
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  condition_list!: ConditionListForm[]
  selected: any = 0;
  // conditions: any[] = [];
  allExpandStatus: boolean = true;

  inspection: any = {
    name: '',
    detail: '',

  }
  chamber: any
  constructor(
    private $master: MasterHttpService,
    private $step3: Step3HttpService
  ) {

  }

  async ngOnInit(): Promise<void> {
    console.clear()
    this.condition_list = await this.$master.getFunctionChamber().toPromise()
    this.condition_list = this.condition_list.map((con: ConditionListForm) => {
      return {
        ...con,
        disable: false
      }
    })
    console.log("🚀 ~  this.condition_list:", this.condition_list)

    this.data = this.conditionForm.data
    this.inspection = this.data[0]?.inspectionDetail ? this.data[0].inspectionDetail : this.inspection
    if (this.data.length > 0) {
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      const step3 = await this.$step3.get(params).toPromise()
      console.log("🚀 ~ step3:", step3)
      let filterOven: any[] = []
      if (step3[0]?.data?.find((d: any) => d.checked && d.type == 'oven')) {
        filterOven = step3[0]?.data?.filter((d: any) => d.checked && d.type == 'oven' || (d.checked && d.type == 'noOven'))
      } else {
        filterOven = step3[0]?.data?.filter((d: any) => {
          if (d.checked) {
            if (d.type == 'noOven' || d.type == 'mix') return true
          }
          return false
        })
      }
      console.log("🚀 ~ filterOven:", filterOven)

      filterOven = filterOven.map((f: any) => {
        return {
          ...f,
          list: f.list.map((l: any) => {
            console.log(l);
            // ! l.name ไม่ตรง กับ c.name
            return {
              ...l,
              value: this.condition_list.find((c: any) => c.name == l.name)?.value || 0
            }
          })
        }
      })
      console.log("🚀 ~ filterOven:", filterOven)

      const filteredData = filterOven.map((f: any) => {
        console.log("🚀 ~ f:", f)

        if (f.type == 'oven') {
          const item = this.data.filter((c: any) => f.list.find((l: any) => l.checked && (l.value == c.value)))
          console.log("🚀 ~ item:", item)
          return item
        } else {
          console.log(f.groupName);

          const item = this.data.find((c: any) => f.groupName == c.name)
          console.log("🚀 ~ item:", item)
          if (item) return [item]
          return [{
            data: {
              qty: null,
              detailTest: '',
              inspection: [0],
              report: [0],
              reportStatus: true,
            },
            name: f.groupName,
            value: 0,
          }]
        }
      })
      // concat list in  filteredData
      console.log(filteredData);

      let concatList = filteredData.reduce((acc: any, cur: any) => {
        return acc.concat(cur)
      }, [])
      concatList = concatList.sort((a: any, b: any) => a.value - b.value)
      console.log(concatList);

      this.data = concatList
      this.emit()
    } else {
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      const step3 = await this.$step3.get(params).toPromise()
      let filterOven: any[] = []
      if (step3[0]?.data?.find((d: any) => d.checked && d.type == 'oven')) {
        filterOven = step3[0]?.data?.filter((d: any) => d.checked && d.type == 'noOven')
      } else {
        filterOven = step3[0]?.data?.filter((d: any) => d.checked && (d.type == 'noOven' || d.type == 'mix'))
      }
      const mapResult = filterOven.map((f: any) => {
        return {
          data: {
            qty: null,
            detailTest: '',
            inspection: [0],
            report: [0],
            reportStatus: true,
          },
          name: f.groupName,
          value: 0,
        }
      })
      this.data.push(...mapResult)
    }

  }


  async onSelected() {
    this.data.push({
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
      }, inspectionDetail: {},
      reportStatus: true,
    })
    // this.emit()
    setTimeout(() => {
      this.selected = 0;
    }, 100);

  }

  async dataChange(e: any, con: any) {
    con.data = e
    if (con.value == 0) {
      con['reportStatus'] = e.reportStatus
    }
    this.emit()
  }

  async onInspectionDetail() {
    this.emit()
  }

  async onUpdateTable() {
    this.emit()
  }

  async emit() {
    // console.log(this.data, this.inspection);
    let dataEmit: any
    dataEmit = await this.mapData(this.data, this.inspection)
    // console.log(dataEmit);
    this.conditionForm.data = dataEmit
    this.conditionFormChange.emit(this.conditionForm)
  }




  mapData(conditions: any, inspection: any) {
    return new Promise(resolve => {
      const result = conditions.map((condition: any) => {

        let data = condition.data;
        data = {
          ...data,
          inspectionDetail: inspection
        }

        const sumStr = this.sumString(condition)

        const dataT = {
          name: sumStr || '',
          operate: data.operate,
          inspectionDetail: data.inspectionDetail,
          inspection: data.inspection,
          report: data.report,
          sample: data.sample || '',
          qty: data.qty
        }
        return {
          ...condition,
          dataTable: dataT,
          inspectionDetail: dataT.inspectionDetail
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
    if (condition && condition.value == 0) {
      sumStr += `${condition.name}`
    }
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

  onDelete(item: any) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.data = this.data.filter((c: any) => c != this.data[item])
        this.emit()
      }
    })

  }

}
