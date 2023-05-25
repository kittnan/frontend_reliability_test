import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { Step3HttpService } from 'src/app/http/step3-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

interface ConditionListForm {
  name: string,
  value: number,
  disable?: boolean
}

@Component({
  selector: 'app-revise-sheet4',
  templateUrl: './revise-sheet4.component.html',
  styleUrls: ['./revise-sheet4.component.scss']
})
export class ReviseSheet4Component implements OnInit {

  @Input() form: any = null

  @Input() formId: any
  conditionForm: any = []
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
    private $revise: RevisesHttpService,
    private _loader: NgxUiLoaderService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.conditionForm = this.form.step4

    this.condition_list = await this.$master.getFunctionChamber().toPromise()
    this.condition_list = this.condition_list.map((con: ConditionListForm) => {
      return {
        ...con,
        disable: false
      }
    })

    this.data = this.conditionForm.data
    this.inspection = this.data[0]?.inspectionDetail ? this.data[0].inspectionDetail : this.inspection
    if (this.data.length > 0) {
      const step3 = this.form.step3
      let filterOven: any[] = []
      if (step3?.data?.find((d: any) => d.checked && d.type == 'oven')) {
        filterOven = step3?.data?.filter((d: any) => d.checked && d.type == 'oven' || (d.checked && d.type == 'noOven'))
      } else {
        filterOven = step3?.data?.filter((d: any) => d.checked && (d.type == 'noOven' || d.type == 'mix'))
      }
      filterOven = filterOven.map((f: any) => {
        return {
          ...f,
          list: f.list.map((l: any) => {
            return {
              ...l,
              value: this.condition_list.find((c: any) => c.name == l.name)?.value || 0
            }
          })
        }
      })

      const filteredData = filterOven.map((f: any) => {
        if (f.type == 'oven') {
          const item = this.data.filter((c: any) => f.list.some((l: any) => l.checked && (l.value == c.value)))
          return item
        } else {
          const item = this.data.find((c: any) => f.groupName == c.name)
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
      let concatList = filteredData.reduce((acc: any, cur: any) => {
        return acc.concat(cur)
      }, [])
      concatList = concatList.sort((a: any, b: any) => a.value - b.value)
      this.data = concatList
      this.emit()
    } else {
      const step3 = this.form.step3
      let filterOven: any[] = []
      if (step3?.data?.find((d: any) => d.checked && d.type == 'oven')) {
        filterOven = step3?.data?.filter((d: any) => d.checked && d.type == 'noOven')
      } else {
        filterOven = step3?.data?.filter((d: any) => d.checked && (d.type == 'noOven' || d.type == 'mix'))
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
    let dataEmit: any
    dataEmit = await this.mapData(this.data, this.inspection)
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

  handleNext() {
    Swal.fire({
      title: 'Do you want to request revise?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v) {
        this.updateRevise()
      }
    })
  }

  async updateRevise() {
    try {
      this._loader.start()
      this.form.status = 'request_revise'
      this.form.level = 14
      await this.$revise.update(this.form._id, this.form).toPromise()
      setTimeout(() => {
        this._loader.stop()
      }, 1000);
    } catch (error) {
      this._loader.stop()
    } finally {
      this._loader.stop()
    }
  }

}