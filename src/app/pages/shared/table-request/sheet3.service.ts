import { Injectable } from '@angular/core';
import { Cell, Row, Workbook, Worksheet } from 'ExcelJs';
import * as ExcelJS from 'ExcelJs';
@Injectable({
  providedIn: 'root'
})
export class Sheet3Service {

  constructor() { }

  // * Sheet 3
  setSheet3(ws: Worksheet, form: any) {

    ws.addRows(
      [
        ['', 'Over All Plan Reliability Test'],
        ['', 'Control No. ' + form.step1.controlNo],
        ['', 'Model No.', 'Model Name', 'Requestor'],
        ['', form.step1.modelNo, form.step1.modelName, form.step5[0].prevUser.name]

      ]
    )
    ws.insertRow(5, ['', 'INSPECTION & REPORT RESULT'])
    ws.getCell('B5').style = {
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
    if (form.table?.data) {
      const header = ['', 'Condition'].concat(form.table.header)
      ws.addRows([header])
      const result_merge = form.table.data.map((d: any, i: number) => {
        return d.map((d1: any) => {
          if (d1 && d1.length > 0) {
            return d1.reduce((p: any, n: any) => {
              p += `\n${n}`
              return p
            }, '')
          } else {
            return ''
          }

        })

      })
      const addFirstColumn = result_merge.map((m: any) => [''].concat(m))
      let c = 0
      const foo = addFirstColumn.reduce((p: any, n: any) => {
        c += 1;
        if (c == 4) {
          p = p.concat(
            [
              ['QE', 'Out of chamber date', '', ''],
              ['', 'Inspection (FCT/APP) date', '', ''],
              ['', 'Optical measurement date', '', ''],
              ['', 'Input Chamber Date', '', ''],
              ['', 'Name operator', '', ''],
            ]
          )
          p = p.concat([n])
          c = 0
        } else {
          if (c == 2) {
            n[0] = 'Plan'
            p = p.concat([n])
          } else {
            p = p.concat([n])
          }
        }
        return p
      }, [])
      ws.addRows(foo)
    }
  }

  setStyleW3(ws: Worksheet) {
    // const cell_head = ws.getCell('A1')
    ws.mergeCells(1, 2, 1, 4)
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


    ws.mergeCells(2, 2, 2, 4)
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

    ws.mergeCells(5, 2, 5, 4)
    const cell_A5 = ws.getCell('B5')
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
        if (count < 9) {
          if (count != 2) {
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

            })

          }


        }
        if (count == 9) {
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


    ws.getColumn(1).eachCell((cell: Cell, rowNum: number) => {
      if (cell.value) {
        if (cell.value == 'Plan' && !cell.isMerged) {
          ws.mergeCells(rowNum, 1, rowNum + 1, 1)
        }
        if (cell.value == 'QE' && !cell.isMerged) {
          ws.mergeCells(rowNum, 1, rowNum + 4, 1)

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
      } else {
        cell.style = {
          alignment: {
            horizontal: 'center',
            vertical: 'middle',
            wrapText: true
          },

        }
      }
    })

  }
}
