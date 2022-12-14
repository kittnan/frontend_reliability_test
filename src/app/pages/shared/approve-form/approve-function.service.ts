import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApproveFunctionService {

  constructor() { }


  currentStep(curStatus: string, data: any) {
    const foo = data.step5.find((d: any) => d.authorize == curStatus)
    return {
      ...foo,
      dateApprove: new Date(),
      statusApprove: true
    }

  }

  nextStep(curStatus: string, data: any, userApprove: any) {
     (curStatus);

    if (curStatus == 'request_approve') {
      const foo = data.step5.find((d: any) => d.authorize == 'qe_window_person')
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_window_person',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 3,
        new: true

      }
    }
    if (curStatus == 'qe_window_person') {
      const foo = data.step5.find((d: any) => d.authorize == 'qe_engineer')
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_engineer',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 4,
        new: true

      }
    }
    if (curStatus == 'qe_engineer') {
      const foo = data.step5.find((d: any) => d.authorize == 'qe_section_head')
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_section_head',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 5,
        new: true

      }
    }
    if (curStatus == 'qe_section_head') {
      const foo = data.step5.find((d: any) => d.authorize == 'qe_window_person' && d.level == 6)
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_window_person',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 6,
        new: true

      }
    }

    if (curStatus == 'reject_request') {
      const foo = data.step5.find((d: any) => d.authorize == 'request' && d.level == 1)
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_window_person',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 6,
        new: true

      }
    }
    return {}
  }
  genStatusForm(action: string, prevStatus: string) {
    if (action == 'approve') {
      if (prevStatus == 'request') return 'request_approve'
      if (prevStatus == 'request_approve') return 'qe_window_person'
      if (prevStatus == 'qe_window_person') return 'qe_engineer'
      if (prevStatus == 'qe_engineer') return 'qe_section_head'
      if (prevStatus == 'qe_section_head') return 'qe_window_person_report'
    }
    if (action == 'reject') {
      if (prevStatus == 'request') return 'reject_' + prevStatus;
    }
    return ''
  }
}
