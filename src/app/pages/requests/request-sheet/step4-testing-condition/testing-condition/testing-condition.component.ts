import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { TempFormService } from './formComponent/temp-form-component/temp-form.service';
import { MatAccordion } from '@angular/material/expansion';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

interface ConditionListForm {
  name: string,
  key: number
}
@Component({
  selector: 'app-testing-condition',
  templateUrl: './testing-condition.component.html',
  styleUrls: ['./testing-condition.component.scss']
})
export class TestingConditionComponent implements OnInit {

  @Input() conditionForm: any
  @Output() conditionFormChange = new EventEmitter();

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  conditionList: ConditionListForm[] = [
    {
      name: 'High Temperature',
      key: 1
    },
    {
      name: 'High Temperature & Humidity',
      key: 2
    },
    {
      name: 'High Temperature & Humidity & Vibration',
      key: 3
    },
    {
      name: 'Low Temperature',
      key: 4
    },
    {
      name: 'High & Low',
      key: 5
    },
    {
      name: 'Heat Shock',
      key: 6
    },

  ]
  selected: any = 0;
  conditions: any = [];
  allExpandStatus: boolean = true;

  inspection: any = {
    name: '',
    detail: '',

  }
  constructor(
    private $tempForm: TempFormService
  ) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.conditions.push({ ...this.selected, data: null })
    setTimeout(() => {
      this.selected = 0;
    }, 100);

  }

  async onUpdateTable() {
    console.log(this.inspection);
    console.log(this.conditions);
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
      }
    })

  }

  mapData(conditions: any, inspection: any) {
    return new Promise(resolve => {
      console.log(conditions);
      const result = conditions.map((condition: any) => {
        const data = condition.data;
        const sumStr = this.sumString(condition)
        const dataT = {
          name: sumStr || '',
          operate: data.operate,
          inspection: inspection,
          timeInspection: data.timeInspection,
          timeReport: data.timeReport,
          sampleNo: data.sampleNo,
          qty: data.qty
        }
        return {
          ...condition,
          dataTable:dataT
        }
      })
      console.log(result);
      resolve(result)
    })
  }

  sumString(condition: any) {
    const data: TestingConditionForm = condition.data
    let sumStr: string = ''
    const direction = `${data.direction?.x},${data.direction?.y},${data.direction?.z}`
    if (condition && condition.key == 1) sumStr += `${condition.name} ${data.highTemp || ''}`
    if (condition && condition.key == 2) sumStr += `Damp proof test  ${data.highTemp || ''} ${data.humidity || ''}`
    if (condition && condition.key == 3) sumStr += `${condition.name}  ${data.highTemp || ''} ${data.humidity || ''} frequency: ${data.hz || ''}Hz Acceleration: ${data.acceleration || ''} Cycles: ${data.timeCycle}min(${data.cycle}) Direction: (${direction})`
    if (condition && condition.key == 4) sumStr += `${condition.name} ${data.lowTemp || ''}`
    if (condition && condition.key == 5) sumStr += `${condition.name} ${data.highTemp || ''} ${data.lowTemp || ''}`
    if (condition && condition.key == 6) sumStr += `${condition.name} ${data.lowTemp || ''}↔${data.highTemp || ''} Cycles: ${data.timeCycle}min(${data.cycle})`
    return sumStr


  }



}
