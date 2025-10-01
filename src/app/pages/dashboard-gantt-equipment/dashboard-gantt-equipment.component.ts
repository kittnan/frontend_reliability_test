import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { ScanHistoryHttpService } from 'src/app/http/scan-history-http.service';



@Component({
    selector: 'app-dashboard-gantt-equipment',
    templateUrl: './dashboard-gantt-equipment.component.html',
    styleUrls: ['./dashboard-gantt-equipment.component.scss'],
    standalone: false
})
export class DashboardGanttEquipmentComponent implements OnInit {
  displayedColumns: string[] = [
    'controlNo',
    'code',
    'conditionName',
    'at',
    'startDate',
    'endDate',
    'statusText',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ])
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myChart!: echarts.ECharts

  constructor(
    private $scanHistory: ScanHistoryHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    const resData = await lastValueFrom(this.$scanHistory.hold(new HttpParams()))
    this.dataSource = new MatTableDataSource(resData)
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.onRunChart()
    }, 300);
  }

  // todo show display
  displayControlNo(element: any, index: number): boolean {
    let data: any = this.dataSource
    data = data._renderData._value
    let key: string = 'controlNo'
    if (index === 0) return true
    if (index !== 0 && data[index - 1][key] != element[key]) {
      return true
    }
    return false
  }

  // todo filter table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // todo run chart
  // onRunChart() {
  //   try {
  //     this.myChart = echarts.init(document.getElementById('main'))
  //     // let option: EChartsOption = {
  //     //   tooltip: {
  //     //     trigger: 'axis',
  //     //     axisPointer: {
  //     //       // Use axis to trigger tooltip
  //     //       type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
  //     //     }
  //     //   },
  //     //   grid: {
  //     //     left: '3%',
  //     //     right: '4%',
  //     //     bottom: '3%',
  //     //     containLabel: true
  //     //   },
  //     //   series: [
  //     //     {
  //     //       type: 'bar',
  //     //       data: [['2022-01-01', '2022-01-02'],
  //     //       ['2022-02-01', '2022-02-20'],
  //     //       ['2022-03-01', '2022-03-21']],
  //     //       barWidth: 10
  //     //     },

  //     //     // {
  //     //     //   name: 'Task 1',
  //     //     //   data: ['2024-01-31', '2024-02-20'],
  //     //     //   stack: 'task',
  //     //     //   barWidth: 30,
  //     //     //   label: {
  //     //     //     show: true,
  //     //     //     position: 'inside'
  //     //     //   }
  //     //     // },
  //     //     // {
  //     //     //   name: 'Task 2',
  //     //     //   data: ['2024-02-20', '2024-03-20'],
  //     //     //   stack: 'task',
  //     //     //   barWidth: 30,
  //     //     //   label: {
  //     //     //     show: true,
  //     //     //     position: 'inside'
  //     //     //   }
  //     //     // }
  //     //   ],
  //     //   xAxis: {
  //     //     type: 'time',
  //     //     // type: 'time',
  //     //     // // Specify the time axis label format
  //     //     // axisLabel: {
  //     //     //   formatter: function (value: any) {
  //     //     //     console.log(value);
  //     //     //     return echarts.format.formatTime('yyyy-MM-dd', value);
  //     //     //     // return echarts.format.formatTime('yyyy-MM-dd', value);
  //     //     //   }
  //     //     // }
  //     //   },
  //     //   // Set the y-axis type to category
  //     //   yAxis: {
  //     //     type: 'time',
  //     //     data:[]
  //     //     // type: 'category',
  //     //     // // Specify the tasks
  //     //     // data: ['Task 1', 'Task 2']
  //     //   },

  //     // }
  //     let option: EChartsOption = {
  //       tooltip: {
  //         formatter: function (params: any) {
  //           if (!params.value) return "";

  //           // const type = params.value[0];

  //           const [type, , name, start, end, rstart, rend] = params.value;
  //           const isOver = type === 1 && rstart && !rend; //
  //           const isGreen = type === 1 && !!rend;

  //           // console.log(
  //           //   "tooltip",
  //           //   isOver,
  //           //   isGreen,
  //           //   type,
  //           //   title,
  //           //   name,
  //           //   start,
  //           //   end,
  //           //   rstart,
  //           //   rend,
  //           //   moment(start).format("YYYY/MM/DD"),
  //           //   moment(end).format("YYYY/MM/DD"),
  //           //   moment(rstart).format("YYYY/MM/DD"),
  //           //   moment(rend).format("YYYY/MM/DD")
  //           // );
  //           const overDays = isOver ? moment(end).diff(moment(start), "day") : 0;
  //           const leftDays = isGreen ? moment(rend).diff(moment(rstart), "day") : 0;

  //           return `${type === 0 ? "预期" : "实际"}${name}${isOver
  //             ? `，已逾期 ${overDays} 天`
  //             : isGreen
  //               ? `，剩余 ${leftDays} 天`
  //               : ""
  //             } <br />
  //           ${moment(start).format("YYYY/MM/DD")} ~
  //           ${moment(isGreen ? rend : end).format("YYYY/MM/DD")}`;
  //         }
  //       },
  //       xAxis: {
  //         type: "value",
  //         // triggerTooltip: false,
  //         silent: true,
  //         scale: true,
  //         splitLine: {
  //           show: true,
  //           lineStyle: { type: "dashed" }
  //         },

  //         axisPointer: {
  //           show: true,
  //           label: {
  //             formatter: function (data) {
  //               // console.log("formatter", data.value);
  //               return moment(data.value).format("YYYY/M/D");
  //             }
  //           }
  //         },

  //         axisLabel: {
  //           formatter: function (val) {
  //             // console.log("axisLabel", val);
  //             return moment(val).format("YYYY/M/D");
  //           }
  //         }
  //       },

  //       yAxis: {
  //         type: "category",
  //         boundaryGap: true, // ["20%", "20%"],
  //         // splitLine: {
  //         //   //网格线
  //         //   show: false
  //         // },
  //         // splitArea: {
  //         //   show: false,
  //         //   // lineStyle: { type: "dashed" }
  //         // },
  //         axisLine: {
  //           //y轴
  //           show: true
  //         },
  //         nameTextStyle: { lineHeight: 30 },
  //         axisLabel: {
  //           lineHeight: 18,
  //           formatter: function (val: any) {
  //             console.log("y-axisLabel", val);

  //             return val ? val.slice(1).join("\n") : "";
  //           }
  //         }
  //         // data: categories
  //       },
  //       series:[

  //       ]

  //     }
  //     this.myChart.setOption(option)

  //   } catch (error) {
  //     console.log("🚀 ~ error:", error)

  //   }

  // }

  // renderItem(params: any, api: any) {
  //   // console.log("444444", 121212);
  //   /*  实现原理:
  //     如果已经给实际结束时间，表示该阶段已经完成，按正常颜色显示；
  //     如果没有给实际结束时间，且上一节点已经完成或是开始节点，则表示该节点是当前节点；
  //     如果没有给实际结束时间，且上一节点没有完成，否则表示节点还没有开始，不需要画图；
  //     如果是当前节点，则判断是否当前节点的情况，未到期|超期|正常。
  //     */
  //   //  数据格式 [[id, code, name],"完成周期",_date([2019, 6, 8]), _date([2019, 7, 18])]
  //   // 这里进行一些处理，例如，坐标转换。
  //   // 这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
  //   const type = api.value(0); // 0 预期，1 实际
  //   const categoryIndex = api.value(1);
  //   const nodeName = api.value(2);
  //   const isOver = api.value(5) && !api.value(6); // 是否逾期
  //   const isGreen = !!api.value(6); // 是否是未到期

  //   // isGreen &&
  //   //   console.log(
  //   //     "categoryIndex",
  //   //     isGreen,
  //   //     color,
  //   //     api.value(0),
  //   //     api.value(1),
  //   //     api.value(2),
  //   //     // moment(api.value(2)).format("YYYY/MM/DD"),
  //   //     moment(api.value(3)).format("YYYY/MM/DD"),
  //   //     moment(api.value(4)).format("YYYY/MM/DD"),
  //   //     moment(api.value(5)).format("YYYY/MM/DD"),
  //   //     moment(api.value(6)).format("YYYY/MM/DD")
  //   //   );

  //   // 这里使用 api.size(...) 获得 Y 轴上数值范围为 1 的一段所对应的像素长度。
  //   const yGridHeight = api.size([0, 1])[1]; // 获取 y 轴上 一段所对应的像素长度
  //   const offsetY = yGridHeight * (type === 0 ? 0.45 : 0.31); // 做个下偏移，使之上下游空白间隙
  //   const height = yGridHeight * (type === 0 ? 0.1 : 0.76); // 获取 y 轴上 一段所对应的像素长度

  //   const data = [
  //     [api.value(3), api.value(4)],
  //     ...(isGreen ? [[api.value(5), api.value(6)]] : [])
  //   ].map(([s, e], index) => {
  //     const startPoint = api.coord([s, categoryIndex]);
  //     const endPoint = api.coord([e, categoryIndex]);
  //     return {
  //       type: "rect",
  //       // silent: true,
  //       // 如果超出显示范围，则进行剪切
  //       shape: echarts.graphic.clipRectByRect(
  //         {
  //           x: startPoint[0],
  //           y: startPoint[1] - offsetY,
  //           width: endPoint[0] - startPoint[0],
  //           height
  //         },
  //         {
  //           x: params.coordSys.x,
  //           y: params.coordSys.y,
  //           width: params.coordSys.width,
  //           height: params.coordSys.height
  //         }
  //       ),
  //       style: { fill: index === 1 ? "green" : "green" },
  //       // styleEmphasis: { fill: "#000" },
  //       // 修复 hover 上去时覆盖顺序正确的问题
  //       z2: index
  //     };
  //   });

  //   return { type: "group", children: data };
  // }



}
