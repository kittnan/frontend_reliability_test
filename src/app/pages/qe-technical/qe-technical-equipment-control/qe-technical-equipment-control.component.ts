import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { EquipmentHttpService } from 'src/app/http/equipment-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
interface ParamsForm {
  userId: string;
  status: string;
  limit: string;
  skip: string;
  sort: string;
  count: string;
}
@Component({
  selector: 'app-qe-technical-equipment-control',
  templateUrl: './qe-technical-equipment-control.component.html',
  styleUrls: ['./qe-technical-equipment-control.component.scss']
})
export class QeTechnicalEquipmentControlComponent implements OnInit {

  // displayedColumns: string[] = ['name', 'imgs', 'action'];
  // dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSet: any = []
  img: any
  preview: string = ''
  constructor(
    private $equipment: EquipmentHttpService,
    private router: Router
  ) {

  }

  async ngOnInit(): Promise<void> {
    try {
      const resData: any = await lastValueFrom(this.$equipment.get(new HttpParams()))
      this.dataSet = resData.map((item: any) => {
        item.preview = item.imgs.length != 0 ? item.imgs[0].path : ''
        return item
      })
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
  // // ฟังก์ชันสำหรับเปิดป๊อปอัป
  // openPopup(img: any): void {
  //   const popup = document.getElementById('popup') as HTMLElement;
  //   if (popup) {
  //     this.img = img
  //     popup.style.display = 'flex'; // แสดงป๊อปอัป
  //   }
  // }
  openDialog(src: string) {
    let div: any = document.getElementById("imageDialog")
    if (div) {
      this.preview = src
      div.style.display = "block";
    }
  }

  closeDialog() {
    let div: any = document.getElementById("imageDialog")
    if (div) {
      div.style.display = "none";
      this.preview = ''
    }
  }
  onActive(item: any) {
    Swal.fire({
      title: "Update equipment active?",
      icon: 'question',
      showCancelButton: true
    }).then(async (v: SweetAlertResult) => {
      if (v.isConfirmed) {
        item.active = !item.active
        let res: any = await lastValueFrom(this.$equipment.createOrUpdate([item]))
        setTimeout(() => {
          this.ngOnInit()
          // location.reload()
        }, 1000);
      }
    })
  }
}
