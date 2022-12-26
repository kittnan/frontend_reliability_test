import { Injectable } from '@angular/core';
import { RequestHttpService } from 'src/app/http/request-http.service';

@Injectable({
  providedIn: 'root'
})
export class RequestSheetService {

  constructor(
    private _request: RequestHttpService
  ) { }

  setTestingTypeList(items: any) {
    return new Promise(resolve => {
      resolve(
        items.map((item: any) => {
          return {
            groupName: item.group,
            checked: false,
            list: item.list
          }
        })

      )
    })
  }


  setControlNo(corporate: any, modelNo: any) {
    return new Promise(resolve => {
      let setFirstDate = new Date().setDate(1)
      let setTime = new Date(setFirstDate).setHours(0, 0, 0, 0)
      let newDate = new Date(setTime)

      this._request.count({
        date: newDate,
        corporate: corporate
      }).subscribe(res => {
        if (res.length > 0) {
          const newCorporate = corporate.toUpperCase()
          const date = new Date();
          const year = date.getFullYear().toString()[2] + date.getFullYear().toString()[3];
          const m = date.getMonth() + 1;
          const month = m.toString().length == 1 ? `0${m.toString()}` : m.toString();
          let no = (res[0].document + 1).toString();
          no = no.length == 1 ? '00' + no : no;
          no = no.length == 2 ? '0' + no : no;
          const number = `00${modelNo}`;
          resolve(`${newCorporate}-${year}-${month}-${no}-${number}`)

        } else {
          const newCorporate = corporate.toUpperCase()
          const date = new Date();
          const year = date.getFullYear().toString()[2] + date.getFullYear().toString()[3];
          const m = date.getMonth()+1;
          const month = m.toString().length == 1 ? `0${m.toString()}` : m.toString();
          const no = '001';
          const number = `00${modelNo}`;
          resolve(`${newCorporate}-${year}-${month}-${no}-${number}`)
        }
      })

    })

  }



}
