import { Injectable } from '@angular/core';
import { Cell, Row, Workbook, Worksheet } from 'ExcelJs';
import * as ExcelJS from 'ExcelJs';

@Injectable({
  providedIn: 'root'
})
export class Sheet2Service {

  constructor() { }

  // * Sheet 2
  setSheet2(ws: Worksheet, form: any) {

    ws.addRows(
      [
        ['Over All Plan Reliability Test'],
        ['Control No. ' + form.step1.controlNo],
        ['Model No.', 'Model Name', 'Requestor'],
        [form.step1.modelNo, form.step1.modelName, form.step5[0].prevUser.name]

      ]
    )
    if (form.table?.data) {
      const header = form.table?.header ? ['Condition'].concat(form.table.header) : ['Condition']
      ws.addRows([header])
      const foo = form.table.data.map((d: any, i: number) => {
        return d.map((d1: any) => {
          if (d1 && d1.length > 0) {
            return d1.reduce((p: any, n: any) => {
              p += `\n ${n}`
              return p
            }, '')
          } else {
            return ''
          }

        })

      })
      ws.addRows(foo)
    }

  }

  setStyleW2(ws: Worksheet) {
    // const cell_head = ws.getCell('A1')
    ws.mergeCells(1, 1, 1, 3)
    ws.getRow(1).eachCell((cell: Cell) => {
      cell.style = {
        alignment: {
          horizontal: 'center',
          vertical: 'middle',
        },
        font: {
          size: 20
        },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })


    ws.mergeCells(2, 1, 2, 3)
    ws.getRow(2).eachCell((cell: Cell) => {
      cell.style = {
        alignment: {
          horizontal: 'center',
          vertical: 'middle',
        },
        font: {
          size: 20
        },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })


    ws.getRow(3).eachCell((cell: Cell) => {
      cell.style = {
        alignment: {
          horizontal: 'center',
          vertical: 'middle',
        },
        font: {
          size: 20
        },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    ws.getRow(4).eachCell((cell: Cell) => {
      cell.style = {
        alignment: {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true
        },
        font: {
          size: 20
        },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })

    const cell_A5 = ws.getCell('A5')
    ws.mergeCells(5, 1, 5, 3)
    cell_A5.style = {
      alignment: {
        horizontal: 'center',
        vertical: 'middle',
      },
      font: {
        size: 18
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '8dda94' },
      },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    }

    ws.getRow(6).eachCell((cell: Cell) => {
      cell.style = {
        alignment: {
          horizontal: 'center',
          vertical: 'middle',
        },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F08080' },
        },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })

    let count = 0
    ws.eachRow((row: ExcelJS.Row, rowNum: number) => {
      if (rowNum >= 7) {
        count++
        if (count < 4) {
          if (count == 1) {
            row.eachCell((cell: Cell, colNum: number) => {
              cell.style = {
                alignment: {
                  horizontal: 'center',
                  vertical: 'middle',
                  wrapText: true
                },
                border: {
                  top: { style: 'thin' },
                  left: { style: 'thin' },
                  bottom: { style: 'thin' },
                  right: { style: 'thin' }
                }

              }
            })
          }
          if (count == 2) {
            row.eachCell((cell: Cell, colNum: number) => {

              let value: any = cell.value
              value = value.split('\n')
              if (value.length == 4) {
                cell.value = {
                  richText: [
                    {
                      text: value[1] + '\n',

                    },
                    {
                      text: value[2] + '\n',
                      font: {
                        color: {
                          argb: 'ff0000',
                        },
                        bold: true
                      }
                    },
                    {
                      text: value[3],
                      font: {
                        color: {
                          argb: '4f6bf7',
                        },
                        bold: true
                      }
                    }
                  ]
                }
                cell.style = {
                  alignment: {
                    horizontal: 'center',
                    vertical: 'middle',
                    wrapText: true
                  },
                  border: {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                  }

                }
              }

            })
          }
          if (count == 3) {
            row.eachCell((cell: Cell, colNum: number) => {
              cell.style = {
                alignment: {
                  horizontal: 'center',
                  vertical: 'middle',
                  wrapText: true
                },
                border: {
                  top: { style: 'thin' },
                  left: { style: 'thin' },
                  bottom: { style: 'thin' },
                  right: { style: 'thin' }
                }

              }
            })
          }

        }
        if (count == 4) {
          count = 0
          row.eachCell((cell: Cell, colNum: number) => {
            cell.style = {
              alignment: {
                horizontal: 'center',
                vertical: 'middle',
                wrapText: true
              },
              fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'a4fcc5' },
              },
              border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
              }
            }
          })
        }

        // * last Row
        if (rowNum == ws.actualRowCount) {
          row.eachCell((cell: Cell, colNum: number) => {
            cell.style = {
              alignment: {
                horizontal: 'center',
                vertical: 'middle',
                wrapText: true
              },
              fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '31ed7f' },
              },
              border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
              }
            }
          })
        }
      }
    })

  }

}
