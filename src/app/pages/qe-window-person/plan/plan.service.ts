import { Injectable } from '@angular/core';
import { UserApproveService } from 'src/app/services/user-approve.service';
import { ApproverForm } from '../../admin/approver/dialog-approver/dialog-approver.component';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private _userApprove: UserApproveService) { }

  setDataTable(request: any) {
    const conditions = request.step4.data;
    return conditions.map((condition: any) => {
      return {
        condition: condition,
        ...request,
      };
    });
  }

  async getUserApprove(
    userLogin: any,
    request: any,
    userApprove: any[],
    authorize: string
  ): Promise<any> {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    userLogin = JSON.parse(userLoginStr);
    let select;
    if (request.level == 7.8) {
      userApprove = await this._userApprove.getUserApprove(
        userLogin,
        'request'
      );
      const prevUser = request?.step5?.find((s: any) => s.level == 1)?.prevUser;
      select = userApprove.find((u: any) => u._id == prevUser._id);
    } else {
      if (
        request.status == 'qe_revise' ||
        request.status == 'reject_qe_window_person'
      ) {
        if (request.level == 5.3 || request.level == 4.3) {
          userApprove = await this._userApprove.getUserApprove(
            userLogin,
            'qe_engineer'
          );
          const prevUser = request?.step5?.find(
            (s: any) => s.level == 4
          )?.prevUser;
          select = userApprove.find((u: any) => u._id == prevUser?._id);
        } else {
          userApprove = await this._userApprove.getUserApprove(
            userLogin,
            'request'
          );
          const prevUser = request?.step5?.find(
            (s: any) => s.level == 1
          )?.prevUser;
          select = userApprove.find((u: any) => u._id == prevUser._id);
        }
      } else {
        userApprove = await this._userApprove.getUserApprove(
          userLogin,
          authorize
        );
        select = this.checkPrevApprove(request, 3, userApprove);
      }
    }
    let approver = await this._userApprove.approver(
      authorize,
      request.level,
      userLogin
    );
    if (approver && approver.groupStatus) {
      userApprove = [approver.selected];
      return { approver, userApprove };
    } else {
      approver = {
        groupList: approver ? approver.groupList : [],
        groupStatus: null,
        level: request?.level ? request.level : null,
        name: null,
        selected: select ? select : userApprove[0],
        status: request?.status ? request.status : null,
      };
      return { approver, userApprove };
    }
  }
  private checkPrevApprove(data: any, level: number, userApprove: any[]) {
    const prevUserApprove = data.step5.find((s: any) => s.level == level);
    if (prevUserApprove) {
      return userApprove.find(
        (u: any) => u._id == prevUserApprove.nextUser._id
      );
    } else {
      return null;
    }
  }

  genPlan(data: any[]) {
    return data.map((selected: any) => {
      const temp: any = {
        startDate: null,
        endDate: null,
        inspectionTime: this.genInspectionTime(
          selected.condition.data.inspection
        ),
        reportQE: this.genInspectionTime(
          selected.condition.data.report
        ),
        reportTime: this.genInspectionTime(
          selected.condition.data.report
        ),
        operate: {
          attachment: {},
          checker: {},
          power: {},
          status: selected.condition.data.operate?.value,
        },
        work: {
          requestId: selected.step1.requestId,
          qty: selected.condition.data.qty,
          controlNo: selected.step1.controlNo,
        },
        condition: {
          name: selected.condition.dataTable.name,
          value: selected.condition.value,
        },
        model: selected.step1.modelNo,
        status: 'draft',
      };
      return temp;
    });
  }


  // genPlan(request: any, data: any[]) {
  //   return data.map((selected: any) => {
  //     let data = {
  //       inspection: selected.inspectionTime,
  //       report: selected.reportTime,
  //       operate: selected.operate,
  //       step1: request.step1
  //     }
  //     const temp: any = {
  //       startDate: null,
  //       endDate: null,
  //       inspectionTime: this.genInspectionTime(
  //         data.inspection
  //       ),
  //       reportQE: this.genInspectionTime(data.report),
  //       reportTime: this.genInspectionTime(data.report),
  //       operate: {
  //         attachment: {},
  //         checker: {},
  //         power: {},
  //         status: data?.operate?.value,
  //       },
  //       work: selected.work,
  //       condition: selected.condition,
  //       model: data.step1.modelNo,
  //       status: 'draft',
  //     };
  //     return temp;
  //   });
  // }

  genInspectionTime(time: any[]) {
    return time.map((t: any) => {
      const temp: any = {
        at: t,
        startDate: null,
        endDate: null,
        hr: 0,
      };
      return temp;
    });
  }

  genNewPlan(request: any) {
    const dataSetTable: any = this.setDataTable(request)
    return dataSetTable.map((selected: any) => {
      const temp: any = {
        startDate: null,
        endDate: null,
        inspectionTime: this.genInspectionTime(
          selected.condition.data.inspection
        ),
        reportQE: this.genInspectionTime(
          selected.condition.data.report
        ),
        reportTime: this.genInspectionTime(
          selected.condition.data.report
        ),
        operate: {
          attachment: {},
          checker: {},
          power: {},
          status: selected.condition.data.operate.value,
        },
        work: {
          requestId: selected.step1.requestId,
          qty: selected.condition.data.qty,
          controlNo: selected.step1.controlNo,
        },
        condition: {
          name: selected.condition.dataTable.name,
          value: selected.condition.value,
        },
        model: selected.step1.modelNo,
        status: 'draft',
      };
      return temp;
    });


  }
}
