import { Injectable } from '@angular/core';
import { QueueForm } from '../../qe-chamber/qe-chamber.component';
import { QeChamberService } from '../../qe-chamber/qe-chamber.service';

@Injectable({
  providedIn: 'root'
})
export class QeWindowPersonReviseApproveService {

  constructor(
    private _qe_chamber: QeChamberService
  ) { }


  setDataTable(form: any) {
    const conditions = form.step4.data;
    return conditions.map((condition: any) => {
      return {
        condition: condition,
        ...form
      }
    })
  }

  genPlan(data: any[]) {
    return data.map((selected: any) => {
      const temp: QueueForm = {
        startDate: null,
        endDate: null,
        inspectionTime: this._qe_chamber.genInspectionTime(selected.condition.data.inspection),
        reportQE: this._qe_chamber.genInspectionTime(selected.condition.data.report),
        reportTime: this._qe_chamber.genInspectionTime(selected.condition.data.report),
        operate: {
          attachment: {},
          checker: {},
          power: {},
          status: selected.condition.data.operate.value
        },
        work: {
          requestId: selected.step1.requestId,
          qty: selected.condition.data.qty,
          controlNo: selected.step1.controlNo,
        },
        condition: {
          name: selected.condition.dataTable.name,
          value: selected.condition.value
        },
        model: selected.step1.modelNo,
        status: 'draft'
      }
      return temp
    })
  }



}
