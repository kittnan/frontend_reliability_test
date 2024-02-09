import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { Step4HttpService } from 'src/app/http/step4-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-advance-mode',
  templateUrl: './advance-mode.component.html',
  styleUrls: ['./advance-mode.component.scss'],
})
export class AdvanceModeComponent implements OnInit {
  request: any = null;

  // ! condition
  selected: any = null;
  condition_list: any = [];
  conditionFormData: any = [];

  // ! inspection
  inspection: any = {
    name: '',
    detail: '',
  };
  constructor(
    private route: ActivatedRoute,
    private $request: RequestHttpService,
    private $master: MasterHttpService,
    public translate: TranslateService,
    private $step4: Step4HttpService
  ) {
    translate.addLangs(['en', 'th']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  async ngOnInit(): Promise<void> {
    try {
      this.route.queryParams.subscribe(async (res: any) => {
        if (res['_id']) {
          const resData: any = await this.$request
            .get_id(res['_id'])
            .toPromise();
          if (resData && resData.length > 0) {
            this.request = resData[0];
            this.conditionFormData = this.request.step4.data;
            this.setInspectionDetail(this.conditionFormData);
          } else {
            throw 'No request';
          }
        }
      });

      this.condition_list = await this.$master.getFunctionChamber().toPromise();
      this.condition_list = this.condition_list.map((con: any) => {
        return {
          ...con,
          disable: false,
        };
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }
  setInspectionDetail(data: any) {
    const someData = data.find((d: any) => d.inspectionDetail);
    this.inspection = someData ? someData.inspectionDetail : null;
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
    setTimeout(() => {
      this.selected = 0;
    }, 100);
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
  async emit() {
    const mergeData: any = await this.mapData(
      this.conditionFormData,
      this.inspection
    );
    this.conditionFormData = mergeData;
  }
  async dataChange(e: any, con: any) {
    con.data = e;
    if (con.value == 0) {
      con['reportStatus'] = e.reportStatus;
    }
    // this.emit()
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

  handleUpdate() {
    Swal.fire({
      title: 'Do you want to update ?',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.update();
      }
    });
  }
  async update() {
    const resUpdate = await this.$step4
      .update(this.request.step4._id, { data: this.conditionFormData })
      .toPromise();
    setTimeout(() => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      });
    }, 1000);
  }
}
