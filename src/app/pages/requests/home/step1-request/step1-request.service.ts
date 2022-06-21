import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Step1RequestService {

  constructor() { }

  setControlNo(corporate: any, modelNo: any) {
    console.log(corporate);
    const requestOnThisMonth = 0
    if (requestOnThisMonth == 0) {
      const newCorporate = corporate.toUpperCase()
      const date = new Date()
      const year = date.getFullYear().toString()[2] + date.getFullYear().toString()[3]
      const month = date.getMonth().toString().length == 1? `0${date.getMonth().toString()}`: date.getMonth().toString()
      const no = '001';
      const number = `00${modelNo}`
      console.log(`${newCorporate}-${year}-${month}-${no}-${number}`);
      
      return `${newCorporate}-${year}-${month}-${no}-${number}`
    }
    return ''
  }
}
