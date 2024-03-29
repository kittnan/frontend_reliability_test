import { Injectable } from '@angular/core';
import { ChamberHttpService } from 'src/app/http/chamber-http.service';
import { MasterHttpService } from 'src/app/http/master-http.service';

@Injectable({
  providedIn: 'root'
})
export class DialogAddService {

  constructor(
    private $chamber: ChamberHttpService
  ) { }

  async getChamberCode(code: String | null) {
    if (code) {
      return code
    } else {
      const lastRecord = await this.$chamber.getLast().toPromise()
      if (lastRecord && lastRecord.length > 0) {
        let temp = lastRecord[0].code.toString().split('-')
        let newCode = (parseInt(temp[1]) + 1).toString();
        newCode = newCode.padStart(3, '0')
        return temp[0] + '-' + newCode
      } else {
        return 'THS-001'
      }
    }
  }

}
