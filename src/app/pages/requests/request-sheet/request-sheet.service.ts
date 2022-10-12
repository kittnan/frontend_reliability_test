import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestSheetService {

  constructor() { }

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

}
