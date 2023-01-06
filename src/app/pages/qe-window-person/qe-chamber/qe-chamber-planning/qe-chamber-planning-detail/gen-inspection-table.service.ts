import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GenInspectionTableService {

  timeReport: any
  constructor() { }

  genTable(times: any, data: any, header: any, key: any, times_report: any) {
    return new Promise(resolve => {
      this.timeReport = times_report
      let arr_table: any[] = []
      for (let i = 0; i < times.length; i++) {
        const foo = this.map_data(times[i], data, header, key)
        const col1 = this.genColHead(times[i].at, times_report)
        const row = col1.map((c: any, i_c: number) => {
          return foo.reduce((prev: any, now: any) => {
            return prev.concat(now[i_c])
          }, [c])

        })
        arr_table.push(...row)
        if (times.length == i + 1) {
          resolve(arr_table)
        }
      }
    })

  }
  private genColHead(at: any, times_report: any) {
    let arr: any[] = []
    let text = ''
    if (times_report.find((t: any) => t.at == at)) {
      text = 'report'
    }
    if (at == 0) {
      arr.push(['Inspection of Initial', text])
      arr.push(['Input to Chamber'])
      arr.push(['-'])
    } else
      if (at != 0 && at != -1) {
        arr.push([`${at}hrs`])
        arr.push([`Inspection after ${at}hrs`, text])
        arr.push(['Input to Chamber'])
        arr.push(['-'])
      } else
        if (at == -1) {
          arr.push(['End Date'])
        }
    return arr
  }




  private map_data(time: any, data: any, header: any, key: any) {
    return data.map((d: any, i: number) => {
      return this.findItem(time, d, header[i], key, d.reportTime)
    })
  }
  private findItem(time: any, d: any, head: any, key: any, timeReport: any) {
    const foundItem = d[key].find((i: any) =>
      i.at == time.at && d.condition.name == head
    )
    let inspec_arr = this.mapCol(foundItem, time, d, timeReport)
    return inspec_arr
  }

  private mapCol(foundItem: any, time: any, data: any, timeReport: any) {
    const start = foundItem?.startDate ? moment(foundItem.startDate).format('ddd, D/M/YY h:mm a') : '-'
    const end = foundItem?.endDate ? moment(foundItem.endDate).format('ddd, D/M/YY h:mm a') : '-'
    const between = start == '-' ? ' - ' : `${start} ➝ ${end}`

    const report = timeReport.find((t: any) => t.at == time.at)
    let reportDate = report?.endDate ? moment(report.endDate).format('ddd, D/M/YY h:mm a') : '-'

    let inspec_arr: any[] = [[], [], []]
    if (foundItem && time.at == 0 && time.at != -1) {
      inspec_arr[0].push(reportDate ? [between, reportDate] : between)
      inspec_arr[1].push([end])
      inspec_arr[2].push(['-'])
    } else
      if (foundItem && time.at != 0 && time.at != -1) {
        inspec_arr[0].push([start])
        inspec_arr[1].push(reportDate ? [between, reportDate] : between)
        inspec_arr[2].push([end])
      } else
        if (!foundItem && time.at == 0 && time.at != -1) {
          inspec_arr[0].push(['-'])
          inspec_arr[1].push(['-'])
          inspec_arr[2].push(['-'])
        } else
          if (!foundItem && time.at != 0 && time.at != -1) {
            inspec_arr[0].push(['-'])
            inspec_arr[1].push(['-'])
            inspec_arr[2].push(['-'])
          }
          else
            if (time.at == -1) {
              const d_end = data?.endDate ? moment(data.endDate).format('ddd, D/M/YY h:mm a') : '-'
              inspec_arr[0].push([d_end])
            }

    return inspec_arr
  }

}
