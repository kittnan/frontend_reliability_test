import { CdkStepper } from '@angular/cdk/stepper';
import { HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { filter } from 'rxjs';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { Step3HttpService } from 'src/app/http/step3-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

interface ConditionListForm {
  name: string;
  value: number;
  disable?: boolean;
}
@Component({
  selector: 'app-revises-sheet4',
  templateUrl: './revises-sheet4.component.html',
  styleUrls: ['./revises-sheet4.component.scss'],
})
export class RevisesSheet4Component implements OnInit {
  // @Input() step4: any
  @Input() requestId: any;
  step4: any = null;

  reviseForm: any = null;
  step3: any = null;

  @Input() formId: any;

  conditionFormData: any[] = [];
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
  constructor(
    private $master: MasterHttpService,
    private $revise: RevisesHttpService,
    private _loader: NgxUiLoaderService,
    private _stepper: CdkStepper
  ) {}

  async ngOnInit(): Promise<void> {
    const params: HttpParams = new HttpParams().set('id', this.requestId);
    const res = await this.$revise.getByRequestId(params).toPromise();
    this.step4 = res[0].step4;
    this.reviseForm = res[0];
    this.step3 = this.reviseForm.step3;

    this.condition_list = await this.$master.getFunctionChamber().toPromise();
    this.condition_list = this.condition_list.map((con: ConditionListForm) => {
      return {
        ...con,
        disable: false,
      };
    });
    this.conditionFormData = this.step4?.data ? this.step4.data : [];
    this.setInspectionDetail(this.conditionFormData);
    this.setOven();
  }

  setInspectionDetail(data: any) {
    const someData = data.find((d: any) => d.inspectionDetail);
    this.inspection = someData ? someData.inspectionDetail : null;
  }

  setOven() {
    if (this.step3) {
      const step3Data = this.step3?.data ? this.step3.data : null;
      let filterChecked: any[] = [];
      // const item = step3Data.find((s: any) => s.checked && s.type == 'oven')

      // todo filter only checked
      filterChecked = step3Data
        ? step3Data.filter((a: any) => a.checked)
        : null;
      // todo find some oven
      const resultFindOven = filterChecked.some((a: any) => a.type == 'oven');
      filterChecked = resultFindOven
        ? filterChecked.filter((a: any) => a.type != 'mix')
        : filterChecked;

      const mapDataListValue = filterChecked.map((f: any) => {
        return {
          ...f,
          list: f.list.map((l: any) => {
            // ! l.name ไม่ตรง กับ c.name
            return {
              ...l,
              value:
                this.condition_list.find((c: any) => c.name == l.name)?.value ||
                0,
            };
          }),
        };
      });

      const mergeData = mapDataListValue.map((f: any) => {
        if (f.type == 'oven') {
          const item = this.conditionFormData.filter((c: any) =>
            f.list.find((l: any) => l.checked && l.value == c.value)
          );
          return item;
        } else {
          const item = this.conditionFormData.find(
            (c: any) => f.groupName == c.name
          );
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

      let concatAndSort = mergeData.reduce((acc: any, cur: any) => {
        return acc.concat(cur);
      }, []);
      // concatAndSort = concatAndSort.sort((a: any, b: any) => a.value - b.value)
      this.conditionFormData = concatAndSort;

      // todo  filter option select chamber function
      const ovenOption = filterChecked.find((a: any) => a.type == 'oven');
      const ovenOptionList = ovenOption
        ? ovenOption.list.filter((l: any) => l.checked)
        : null;
      this.condition_list = this.condition_list.filter((c: any) =>
        ovenOptionList.some((l: any) => {
          if (l.value == c.value) return true;
          if (l.value == 5 && c.value == 1) return true;
          if (l.value == 5 && c.value == 2) return true;
          return false;
        })
      );
      console.log(this.condition_list);

      // this.condition_list = this.condition_list.filter((c: any) => {

      // })
    }
  }

  async onSelected() {
    this.conditionFormData.push({
      ...this.selected,
      data: {
        roomTemp: {
          temp: '0',
          tempVar: '0',
        },
        lowTemp: {
          temp: '0',
          tempVar: '0',
        },
        highTemp: {
          temp: '0',
          tempVar: '0',
        },
        operate: {
          text: 'operate',
          value: true,
        },
        sample: '',
        qty: '',
        inspection: [0],
        report: [0],
        humi: '0',
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
        inspectionDetail: {
          name: 'normal',
          value: '',
        },
      },
      inspectionDetail: {},
      reportStatus: true,
    });
    // this.emit()
    setTimeout(() => {
      this.selected = 0;
    }, 100);
  }

  async dataChange(e: any, con: any) {
    con.data = e;
    if (con.value == 0) {
      con['reportStatus'] = e.reportStatus;
    }
    // this.emit()
  }

  // async onInspectionDetail() {
  //   this.emit()
  // }

  // async onUpdateTable() {
  //   this.emit()
  // }

  async emit() {
    // console.log(this.data, this.inspection);
    const mergeData: any = await this.mapData(
      this.conditionFormData,
      this.inspection
    );
    this.conditionFormData = mergeData;
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
    return sumStr;
  }

  onDelete(item: any) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.conditionFormData = this.conditionFormData.filter(
          (c: any) => c != this.conditionFormData[item]
        );
        this.emit();
      }
    });
  }

  onNext() {
    Swal.fire({
      title: `Do you want to save draft?`,
      icon: 'question',
      showCancelButton: true,
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        const mergeData: any = await this.mapData(
          this.conditionFormData,
          this.inspection
        );
        const dataUpdate = {
          ...this.step4,
          data: mergeData,
        };

        this._loader.start();
        await this.$revise
          .updateByRequestId(this.requestId, { step4: dataUpdate })
          .toPromise();
        setTimeout(() => {
          this._loader.stop();
          Swal.fire('Success', '', 'success');
          this._stepper.next();
        }, 1000);
      }
    });
  }
  onBack() {
    this._stepper.previous();
  }
}
