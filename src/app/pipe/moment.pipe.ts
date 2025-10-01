import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'mo',
    standalone: false
})
export class MomentPipe implements PipeTransform {

  transform(date: string | Date, format: string = 'YYYY-MM-DD'): string {
    return moment(date).format(format)
  }

}
