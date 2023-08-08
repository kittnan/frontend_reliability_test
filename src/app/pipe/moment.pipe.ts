import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'mo'
})
export class MomentPipe implements PipeTransform {

  transform(date: string | Date, format: string = 'YYYY-MM-DD'): string {
    return moment(date).format(format)
  }

}
