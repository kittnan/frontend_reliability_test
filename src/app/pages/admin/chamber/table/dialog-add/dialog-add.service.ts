import { Injectable } from '@angular/core';
import { MasterHttpService } from 'src/app/http/master-http.service';

@Injectable({
  providedIn: 'root'
})
export class DialogAddService {

  constructor(
    private $master: MasterHttpService
  ) { }

  async getChamberCode(code: String | null) {
    if (code) {
      return code
    } else {
      const lastRecord = await this.$master.getChamberLastRecord().toPromise()
      if (lastRecord) {
        let temp = lastRecord[0].code.toString().split('-')
        let newCode = (parseInt(temp[1]) + 1).toString();
        newCode = newCode.length == 1 ? '00' + newCode : newCode;
        newCode = newCode.length == 2 ? '0' + newCode : newCode;
        return temp[0] + '-' + newCode
      } else {
        return 'THS-001'
      }
    }
  }

}
