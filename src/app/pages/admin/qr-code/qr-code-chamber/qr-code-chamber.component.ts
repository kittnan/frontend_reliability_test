import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChamberHttpService } from 'src/app/http/chamber-http.service';
import * as QRCode from 'qrcode'
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-qr-code-chamber',
  templateUrl: './qr-code-chamber.component.html',
  styleUrls: ['./qr-code-chamber.component.scss']
})
export class QrCodeChamberComponent implements OnInit {
  displayedColumns: string[] = ['select', 'code', 'name', 'capacity', 'function', 'qrcode'];
  dataSource: any = new MatTableDataSource()
  selection = new SelectionModel<any>(true, []);

  constructor(
    private $chamber: ChamberHttpService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const resChamber: any = await this.$chamber.get().toPromise()
      let mapChamber = await resChamber.map(async (a: any) => {
        return {
          ...a,
          qrcode: await QRCode.toDataURL(a.code)
        }
      })
      mapChamber = mapChamber.map((a: any) => {
        return a['__zone_symbol__value']
      })
      this.dataSource = new MatTableDataSource(mapChamber)
    } catch (error) {
      console.log("🚀 ~ error:", error)

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

  async generateQR(text: string) {
    try {
      console.log(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }

  handlePreview() {
    console.log(this.selection.selected);
    const selected = this.selection.selected.map((a: any) => a.code)
    const route = 'admin/qr-code-preview';
    const codeStr = JSON.stringify(selected)
    this.router.navigate([route], {
      queryParams:{
        code:codeStr
      }
    });
  }


}
