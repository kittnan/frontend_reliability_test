import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { EquipmentHttpService } from 'src/app/http/equipment-http.service';

@Component({
  selector: 'app-equipment2',
  templateUrl: './equipment2.component.html',
  styleUrls: ['./equipment2.component.scss']
})
export class Equipment2Component implements OnInit {

  displayedColumns: string[] = ['name', 'imgs', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  img: any
  constructor(
    private $equipment: EquipmentHttpService,
    private router: Router
  ) {

  }

  async ngOnInit(): Promise<void> {
    try {
      const resData: any = await lastValueFrom(this.$equipment.get(new HttpParams()))
      console.log("🚀 ~ resData:", resData)
      this.dataSource = new MatTableDataSource(resData)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onNew() {
    this.router.navigate(['admin/equipment2-new'])
  }
  edit(row: any) {
    console.log("🚀 ~ row:", row)
    this.router.navigate(['admin/equipment2-new'], {
      queryParams: {
        name: row.name
      }
    })
  }
  // ฟังก์ชันสำหรับเปิดป๊อปอัป
  openPopup(img: any): void {
    const popup = document.getElementById('popup') as HTMLElement;
    if (popup) {
      this.img = img
      popup.style.display = 'flex'; // แสดงป๊อปอัป
    }
  }

  // ฟังก์ชันสำหรับปิดป๊อปอัป
  closePopup(): void {
    const popup = document.getElementById('popup') as HTMLElement;
    if (popup) {
      popup.style.display = 'none'; // ซ่อนป๊อปอัป
    }
  }

}
