import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GenInspectionTableService {

  timeReport: any
  timeReportQE: any

  inspecTime: any
  reportTime: any
  receive: any
  header: any
  constructor() { }

  genTable2(inspecTime: any, reportTime: any, receive: any, header: any) {
    console.clear()
    console.log(inspecTime);
    console.log(reportTime);
    console.log(receive);
    console.log(header);
    this.inspecTime = inspecTime
    this.reportTime = reportTime
    this.receive = receive
    this.header = header
    for (let i_inspec = 0; i_inspec < inspecTime.length; i_inspec++) {
      this.createRow(inspecTime[i_inspec])
    }


  }

  private createRow(inspec: any) {
    console.log(inspec);

    // * 6 row
    const numRows = 6
    for (let i_row = 1; i_row <= numRows; i_row++) {
      // console.log(i_row);
      // const start = foundItem?.startDate ? moment(foundItem.startDate).format('ddd, D-MMM-YY,h:mm a') : '-'
      // const end = foundItem?.endDate ? moment(foundItem.endDate).format('ddd, D-MMM-YY,h:mm a') : '-'
      // const between = start == '-' ? ' - ' : `${start} ➝ ${end}`
      let cols: any[] = []
      if (i_row === 1) {

        if (inspec.at === 0) {
          cols.push(
            ['sample receive', ...this.receive]
          )
        } else
          if (inspec.at === -1) {
            cols.push(
              ['end date', 'date']
            )
          }
          else {
            cols.push([
              `${inspec.at}hrs`, ''
            ])
          }

      }

      if (i_row === 2) {

      }
      if (i_row === 3) {

      }
      if (i_row === 4) {

      }
      if (i_row === 5) {

      }
      if (i_row === 6) {

      }
    }

  }

  genHeader(header: string[], dataArr: any[]) {
    header.map((h: any) => {
      const item = dataArr.find((d: any) => d.condition.name.toLowerCase() === h.toLowerCase())
      return {
        // text: item.
      }
    })
    return []
  }

  genTable(times: any, data: any, header: any, key: any, times_report: any, receive: any[]) {
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
          let newReceive = receive.map((r: any) => [r])
          const res = [newReceive, ...arr_table]
          resolve(res)
        }
      }
    })

  }
  private genColHead(at: any, times_report: any) {
    let arr: any[] = []
    if (times_report.find((t: any) => t.at == at)) {
    }
    if (at == 0) {
      arr.push(['Inspection of Initial', 'Report', 'QE Report'])
      arr.push(['Input to Chamber'])
      arr.push(['-'])
    } else
      if (at != 0 && at != -1) {
        arr.push([`${at}hrs`])
        arr.push([`Inspection after ${at}hrs`, 'Report', 'QE Report'])
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

    const start = foundItem?.startDate ? moment(foundItem.startDate).format('ddd, D-MMM-YY,h:mm a') : '-'
    const end = foundItem?.endDate ? moment(foundItem.endDate).format('ddd, D-MMM-YY,h:mm a') : '-'
    const between = start == '-' ? ' - ' : `${start} ➝ ${end}`

    const report = timeReport.find((t: any) => t.at == time.at)
    let reportDate = report?.endDate ? moment(report.endDate).format('ddd, D-MMM-YY,h:mm a') : '-'

    const dataReportQE = data.reportQE
    const foundReportQE = report ? dataReportQE.find((t: any) => t.at === foundItem?.at) : null
    const endDateReportQE = foundReportQE?.endDate ? moment(foundReportQE.startDate).add(foundReportQE.hr, 'hour').format('ddd, D-MMM-YY,h:mm a') : '-'

    // console.log(foundItem);
    // console.log(timeReport);
    // console.log(dataReportQE);



    let inspec_arr: any[] = [[], [], []]
    if (foundItem && time.at == 0 && time.at != -1) {
      inspec_arr[0].push(reportDate ? [between, reportDate, endDateReportQE] : between)
      inspec_arr[1].push([end])
      inspec_arr[2].push(['-'])
    } else
      if (foundItem && time.at != 0 && time.at != -1) {
        inspec_arr[0].push([start])
        inspec_arr[1].push(reportDate ? [between, reportDate, endDateReportQE] : between)
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
              const d_end = data?.endDate ? moment(data.endDate).format('ddd, D-MMM-YY,h:mm a') : '-'
              inspec_arr[0].push([d_end])
            }

    return inspec_arr
  }

}
