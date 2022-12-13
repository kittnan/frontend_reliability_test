import { HttpParams } from '@angular/common/http';
import { Step3HttpService } from './../../../../../../../http/step3-http.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';
import { TempFormService } from 'src/app/pages/requests/request-sheet/step4-testing-condition/testing-condition/formComponent/temp-form-component/temp-form.service';
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
  conditions: any = [];
  allExpandStatus: boolean = true;

  inspection: any = {
    name: '',
    detail: '',

  }
  constructor(
    private $tempForm: TempFormService,
    private $master: MasterHttpService,
    private $step3: Step3HttpService
  ) {

  }

  async ngOnInit(): Promise<void> {
    const params: HttpParams = new HttpParams().set('requestId', this.formId)
    const step3 = await this.$step3.get(params).toPromise()
    console.log(step3);
    const step3ListSelected = step3[0].data[0].list
    this.conditionList = await this.$master.getFunctionChamber().toPromise()
    this.conditionList = this.conditionList.map((con: ConditionListForm) => {
      return {
        ...con,
        disable: false
      }
    })
    console.log(this.conditionList);
    console.log('TTTTTTTTTTTTTTTTTGGGGGGGGGGgg',this.conditionForm);
    if(this.conditionForm){
      this.conditions = this.conditionForm
    }
  }

  checkDisable(item: ConditionListForm, step3ListSelected: any[]) {
    console.log(item.value);

    if (item.value == 1) {
      alert('1')
      const foo = step3ListSelected.find((foo: any) => foo.name.toLowerCase().includes('low'))
      console.log(foo);

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

  onSelected() {
    this.conditions.push({ ...this.selected, data: null })
    setTimeout(() => {
      this.selected = 0;
    }, 100);
    console.log(this.conditions);


  }

  foo(e:any,con:any){
    // console.log('%%%%',e);
    console.log(con);

    con.data = e
    console.log('<><><><><>',con);

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
          dataTable: dataT
        }
      })
      console.log(result);
      resolve(result)
    })
  }

  sumString(condition: any) {
    const data: TestingConditionForm = condition.data
    let sumStr: string = ''
    console.log(data);

    const direction = data && data.direction ? `${data.direction?.x},${data.direction?.y},${data.direction?.z}` : ''
    if (condition && condition.value == 1) sumStr += `${condition.name} ${data.temp || ''}`
    if (condition && condition.value == 2) sumStr += `${condition.name} ${data.temp || ''}`
    if (condition && condition.value == 3) sumStr += `Damp proof test  ${data.highTemp || ''} ${data.humidity || ''}`
    if (condition && condition.value == 4) sumStr += `${condition.name}  ${data.highTemp || ''} ${data.humidity || ''} frequency: ${data.hz || ''}Hz Acceleration: ${data.acceleration || ''} Cycles: ${data.timeCycle}min(${data.cycle}) Direction: (${direction})`
    if (condition && condition.value == 5) sumStr += `${condition.name} ${data.highTemp || ''} ${data.lowTemp || ''}`
    if (condition && condition.value == 6) sumStr += `${condition.name} ${data.lowTemp || ''}↔${data.highTemp || ''} Cycles: ${data.timeCycle}min(${data.cycle})`
    return sumStr


  }

}
