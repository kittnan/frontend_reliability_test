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
  displayedColumns: string[] = ['select', 'code', 'name', 'location', 'qrcode'];
  dataSource: any = null
  selection = new SelectionModel<any>(true, []);

  text1!: string
  numberStart!: string
  numberEnd!: string
  digit!: string
  location!: string
  name!: string

  constructor(
    private router: Router,
    private $tracking: TrackingOperateHttpService
  ) { }
  async ngOnInit(): Promise<void> {
    try {
      let qrStr: any = localStorage.getItem('RLS_qr')
      qrStr = qrStr ? JSON.parse(qrStr) : null
      if (qrStr) {
        this.dataSource = new MatTableDataSource(qrStr)
      }

    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
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
            qrcode: await QRCode.toDataURL(a),
            name: this.name,
            location: this.location,
            no: a.toString().split('-')[2]
          }
        })
        mapData = mapData.map((a: any) => {
          return a['__zone_symbol__value']
        })
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
    const selected = this.selection.selected
    const route = 'admin/qr-code-preview';
    const codeStr = JSON.stringify(selected)
    localStorage.setItem('RLS_qr', codeStr)
    this.router.navigate([route]);
    // this.router.navigate([route], {
    //   queryParams: {
    //     code: codeStr
    //   }
    // });
  }

  async createData() {
    try {
      const dataCreate = this.selection.selected.map((a: any) => {
        return {
          ...a,
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
