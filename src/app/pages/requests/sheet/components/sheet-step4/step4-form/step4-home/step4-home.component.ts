import { HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MasterHttpService } from 'src/app/http/master-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Step3HttpService } from './../../../../../../../http/step3-http.service';
import { DialogSelectTempComponent } from './dialog-select-temp/dialog-select-temp.component';
import { DiaLogSelectOperateComponent } from './dia-log-select-operate/dia-log-select-operate.component';
import { Step1HttpService } from 'src/app/http/step1-http.service';

interface ConditionListForm {
  name: string;
  value: number;
  disable?: boolean;
}
@Component({
  selector: 'app-step4-home',
  templateUrl: './step4-home.component.html',
  styleUrls: ['./step4-home.component.scss'],
})
export class Step4HomeComponent implements OnInit {
  @Input() step1: any;
  @Input() formId: any;
  @Input() conditionForm: any = [];
  // tempConditionForm: any = []
  @Output() conditionFormChange = new EventEmitter();
  data: any[] = [];
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  condition_list!: ConditionListForm[];
  selected: any = 0;
  // conditions: any[] = [];
  allExpandStatus: boolean = true;

  inspection: any = {
    name: '',
    detail: '',
  };
  chamber: any;

  modelCondition: any
  constructor(
    private $master: MasterHttpService,
    private $step3: Step3HttpService,
    public dialog: MatDialog,
    private $step1 :Step1HttpService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log(this.step1);
    if (this.step1) {
      this.modelCondition = await this.$master.getModelCondition(new HttpParams().set('Model', this.step1.modelNo)).toPromise();
    }
    this.condition_list = await this.$master.getFunctionChamber().toPromise();
    this.condition_list = this.condition_list.map((con: ConditionListForm) => {
      return {
        ...con,
        disable: false,
      };
    });
    this.data = this.conditionForm.data;
    this.inspection = this.data[0]?.inspectionDetail
      ? this.data[0].inspectionDetail
      : this.inspection;
    if (this.data.length > 0) {
      const params: HttpParams = new HttpParams().set('requestId', this.formId);
      const step3 = await this.$step3.get(params).toPromise();
      let filterOven: any[] = [];
      if (step3[0]?.data?.find((d: any) => d.checked && d.type == 'oven')) {
        filterOven = step3[0]?.data?.filter(
          (d: any) =>
            (d.checked && d.type == 'oven') || (d.checked && d.type == 'noOven')
        );
      } else {
        filterOven = step3[0]?.data?.filter((d: any) => {
          if (d.checked) {
            if (d.type == 'noOven' || d.type == 'mix') return true;
          }
          return false;
        });
      }

      filterOven = filterOven.map((f: any) => {
        return {
          ...f,
          list: f.list.map((l: any) => {
            return {
              ...l,
              value: this.condition_list.find((c: any) => c.value == l.value)
                ?.value,
            };
          }),
        };
      });

      const filteredData = filterOven.map((f: any) => {
        if (f.type == 'oven') {
          const item = this.data.filter((c: any) =>
            f.list.find((l: any) => l.checked && l.value == c.value)
          );
          return item;
        } else {
          const item = this.data.find((c: any) => f.groupName == c.name);
          if (item) return [item];
          return [
            {
              data: {
                qty: null,
                detailTest: '',
                inspection: [0],
                report: [0],
                reportStatus: true,
              },
              name: f.groupName,
              value: 0,
            },
          ];
        }
      });
      // concat list in  filteredData
      let concatList = filteredData.reduce((acc: any, cur: any) => {
        return acc.concat(cur);
      }, []);
      concatList = concatList.sort((a: any, b: any) => a.value - b.value);
      this.data = concatList;
      this.emit();
    } else {
      const params: HttpParams = new HttpParams().set('requestId', this.formId);
      const step3 = await this.$step3.get(params).toPromise();
      let filterOven: any[] = [];
      if (step3[0]?.data?.find((d: any) => d.checked && d.type == 'oven')) {
        filterOven = step3[0]?.data?.filter(
          (d: any) => d.checked && d.type == 'noOven'
        );
      } else {
        filterOven = step3[0]?.data?.filter(
          (d: any) => d.checked && (d.type == 'noOven' || d.type == 'mix')
        );
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
        };
      });
      this.data.push(...mapResult);
    }
  }

  async onSelected() {
    let choices: any[] = [];
    if (this.modelCondition) {
      for (const key in this.modelCondition) {
        if (!key.includes('[')) continue;
        let newKey = key
        let operateStateCondition: boolean = false
        if (key.includes('-o')) {
          operateStateCondition = true
          newKey = newKey.replace('-o', '');
        } else {
          operateStateCondition = false
          newKey = newKey.replace('-n', '');
        }


        newKey = newKey.split('[')[0];
        if (newKey == this.selected.name) {
          choices.push({
            name: newKey,
            value: this.modelCondition[key],
            operate: operateStateCondition
            // maxInterval: this.modelCondition["Max interval"],
          });
        }
      }
    }
    if (choices.length > 0) {
      let disableState = false
      let operateObj = {
        text: 'operate',
        value: true,
      }
      // todo : heat shock
      if (this.selected.value == 6) {
        disableState = true
        operateObj = {
          text: 'no-operate',
          value: false,
        }
      }

      let dataRef1 = this.dialog.open(DiaLogSelectOperateComponent, {
        data: {
          disable: disableState,
          operate: operateObj
        },
        disableClose: true
      })
      dataRef1.afterClosed().subscribe((res: any) => {
        if (res) {
          operateObj = res.operate;
          if (res.operate.value) {
            choices = choices.filter((c: any) => c.operate == true);
          } else {
            choices = choices.filter((c: any) => c.operate == false);
          }
          let dataRef = this.dialog.open(DialogSelectTempComponent, {
            data: choices,
            disableClose: true,
          })
          dataRef.afterClosed().subscribe((res: any) => {
            if (res) {
              if (this.selected.value == 1) {
                this.createNewCondition(res.value, '0', '0', operateObj);
              }
              else
                if (this.selected.value == 2) {
                  this.createNewCondition('0', res.value, '0', operateObj);
                }
                else
                  if (this.selected.value == 3) {
                    const valueSp = res.value.toString().replaceAll(' ', '').replaceAll('%', '').split(',')
                    const temp = valueSp[0] ? valueSp[0] : '0'
                    const humi = valueSp[1] ? valueSp[1] : '0'

                    this.createNewCondition('0', temp, humi, operateObj);
                  }
                  else
                    if (this.selected.value == 6) {
                      const valueSp = res.value.toString().replaceAll(' ', '').replaceAll('%', '').split(',')
                      const low = valueSp[0] ? valueSp[0] : '0'
                      const high = valueSp[1] ? valueSp[1] : '0'
                      this.createNewCondition(low, high, '0', operateObj);
                    }
            } else {
              this.createNewCondition('0', '0', '0', operateObj);
            }
          })
        } else {

        }
      })


    } else {
      this.createNewCondition('0', '0', '0');
    }


  }

  createNewCondition(low: string = '0', high: string = '0', humi: string = '0', operate = {
    text: 'operate',
    value: true
  }) {
    this.data.push({
      data: {
        roomTemp: {
          temp: '0',
          tempVar: '0',
        },
        lowTemp: {
          temp: low,
          tempVar: '',
        },
        highTemp: {
          temp: high,
          tempVar: '0',
        },
        operate: operate,
        sample: '',
        qty: '',
        inspection: [0],
        report: [0],
        humi: humi,
        frequency: {
          high: '0',
          low: '0',
        },
        acceleration: '0',
        time: '0',
        cycle: '0',
        direction: {
          x: '0',
          y: '0',
          z: '0',
        },
      },
      name: this.selected.name,
      value: this.selected.value,
      inspectionDetail: {},
      reportStatus: true,
    })
    setTimeout(() => {
      this.selected = 0
    }, 1);
  }

  async dataChange(e: any, con: any) {
    con.data = e;
    if (con.value == 0) {
      con['reportStatus'] = e.reportStatus;
    }
    this.emit();
  }

  async onInspectionDetail() {
    this.emit();
  }

  async onUpdateTable() {
    this.emit();
  }

  async emit() {
    // console.log(this.data, this.inspection);
    let dataEmit: any;
    dataEmit = await this.mapData(this.data, this.inspection);
    // console.log(dataEmit);
    this.conditionForm.data = dataEmit;
    this.conditionFormChange.emit(this.conditionForm);
  }

  mapData(conditions: any, inspection: any) {
    return new Promise((resolve) => {
      const result = conditions.map((condition: any) => {
        let data = condition.data;
        data = {
          ...data,
          inspectionDetail: inspection,
        };

        const sumStr = this.sumString(condition);

        const dataT = {
          name: sumStr || '',
          operate: data.operate,
          inspectionDetail: data.inspectionDetail,
          inspection: data.inspection,
          report: data.report,
          sample: data.sample || '',
          qty: data.qty,
        };
        return {
          ...condition,
          dataTable: dataT,
          inspectionDetail: dataT.inspectionDetail,
        };
      });
      resolve(result);
    });
  }

  sumString(condition: any) {
    const data: any = condition.data;
    let sumStr: string = '';
    const roomTemp =
      data && data.roomTemp
        ? `${data.roomTemp.temp}±${data.roomTemp.tempVar}°C`
        : '';
    const lowTemp =
      data && data.lowTemp
        ? `${data.lowTemp.temp}±${data.lowTemp.tempVar}°C`
        : '';
    const highTemp =
      data && data.highTemp
        ? `${data.highTemp.temp}±${data.highTemp.tempVar}°C`
        : '';
    const acceleration =
      data && data.acceleration ? `Acceleration: ${data.acceleration}m/s2` : '';
    const cycle = data && data.cycle ? `${data.cycle}` : '';
    const time = data && data.time ? `${data.time}` : '';
    const timeCycle = cycle && time ? `Cycles: ${time}min(${cycle})` : '';
    const humi = data && data.humi ? `${data.humi}%RH` : '';
    const direction: any =
      data && data.direction
        ? `Direction: (${data.direction?.x},${data.direction?.y},${data.direction?.z})`
        : '';
    const frequency =
      data && data.frequency && data.frequency.low && data.frequency.high
        ? `Frequency: ${data.frequency.low}-${data.frequency.high}Hz`
        : '';
    if (condition && condition.value == 0) {
      sumStr += `${condition.name}`;
    }
    if (condition && condition.value == 1) {
      sumStr += `${condition.name} ${lowTemp}`;
    }
    if (condition && condition.value == 2) {
      sumStr += `${condition.name} ${highTemp}`;
    }
    if (condition && condition.value == 3) {
      sumStr += `Damp proof test  ${highTemp} ${humi}`;
    }
    if (condition && condition.value == 4) {
      sumStr += `${condition.name}  ${highTemp} ${humi} ${frequency} ${acceleration} ${timeCycle} ${direction}`;
    }
    if (condition && condition.value == 5) {
      sumStr += `${condition.name} ${highTemp} ↔ ${lowTemp}`;
    }
    if (condition && condition.value == 6) {
      sumStr += `${condition.name} ${lowTemp}↔${highTemp} ${timeCycle}`;
    }
    if (condition && condition.value == 7) {
      sumStr += `${condition.name} ${roomTemp}`;
    }
    return sumStr;
  }

  onDelete(item: any) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.data = this.data.filter((c: any) => c != this.data[item]);
        this.emit();
      }
    });
  }
}
