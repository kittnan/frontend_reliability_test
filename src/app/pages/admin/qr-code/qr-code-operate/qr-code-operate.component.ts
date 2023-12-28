import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';
import { TrackingOperateHttpService } from 'src/app/http/tracking-operate-http.service';

@Component({
  selector: 'app-qr-code-operate',
  templateUrl: './qr-code-operate.component.html',
  styleUrls: ['./qr-code-operate.component.scss']
})
export class QrCodeOperateComponent implements OnInit {
  displayedColumns: string[] = ['select', 'code', 'qrcode'];
  dataSource: any = null
  selection = new SelectionModel<any>(true, []);

  text1!: string
  numberStart!: string
  numberEnd!: string
  digit!: string

  constructor(
    private router: Router,
    private $tracking: TrackingOperateHttpService
  ) { }
  async ngOnInit(): Promise<void> {
    try {
      // console.log('1');

      // const gpp = await this.foo()
      // console.log("🚀 ~ gpp:", gpp)
      // this.dataSource = new MatTableDataSource(mapChamber)
      // console.log("🚀 ~ resOperate:", resOperate)
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }


  foo() {
    return new Promise(resolve => {
      console.log('2');

      let arr = ['1', '2', '3', '4', '5', '6', '7']
      const bb = Promise.all(
        arr.map(async (a: any) => {
          console.log('-');

          return await QRCode.toDataURL(a)
        })
      );
      console.log("🚀 ~ bb:", bb)
      resolve(bb)
    })

  }

  async handleRunNumber() {
    const startNum = Number(this.numberStart)
    const endNum = Number(this.numberEnd)
    const digit = Number(this.digit)

    let values = []
    for (let i = startNum; i <= endNum; i++) {
      values.push(
        `${this.text1}-${i.toString().padStart(digit, '0')}`
      )
      if (i === endNum) {
        let mapData = await values.map(async (a: any) => {
          return {
            code: a,
            qrcode: await QRCode.toDataURL(a)
          }
        })
        mapData = mapData.map((a: any) => {
          return a['__zone_symbol__value']
        })
        console.log("🚀 ~ mapData:", mapData)
        this.dataSource = new MatTableDataSource(mapData)
      }
    }


  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  handlePreview() {
    const selected = this.selection.selected.map((a: any) => a.code)
    const route = 'admin/qr-code-preview';
    const codeStr = JSON.stringify(selected)
    this.router.navigate([route], {
      queryParams: {
        code: codeStr
      }
    });
  }

  async createData() {
    try {
      const dataCreate = this.selection.selected.map((a: any) => {
        return {
          code: a.code,
          location: null,
          status: 'normal'
        }
      })
      await this.$tracking.insert(dataCreate).toPromise()
      this.selection.clear()
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }



}
