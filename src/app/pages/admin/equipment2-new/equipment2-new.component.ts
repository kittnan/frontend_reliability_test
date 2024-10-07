import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { EquipmentHttpService } from 'src/app/http/equipment-http.service';
import { HttpFileServeService } from 'src/app/http/http-file-serve.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipment2-new',
  templateUrl: './equipment2-new.component.html',
  styleUrls: ['./equipment2-new.component.scss']
})
export class Equipment2NewComponent implements OnInit {

  item: any = {
    name: '',
    imgs: []
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private $equipment: EquipmentHttpService,
    private $fileS: HttpFileServeService
  ) { }

  ngOnInit(): void {
    try {
      this.getData()
    } catch (error) {
      console.log("🚀 ~ error:", error)
      setTimeout(() => {
        Swal.fire(JSON.stringify(error), '', 'error')
      }, 500);
    }
  }
  getData(){
    this.route.queryParams.subscribe(async (p0: any) => {
      if (p0?.name) {
        let p1: HttpParams = new HttpParams()
        p1 = p1.set('name', p0.name)
        const resData: any = await lastValueFrom(this.$equipment.get(p1))
        if (resData?.length != 0) {
          this.item = resData[0]
        } else {
          throw 'no data'
        }
      }
    })
  }
  back() {
    this.router.navigate(['admin/equipment2'])
  }
  async upload(e: any) {
    if (this.item._id) {
      let files = e.target.files
      if (files?.length != 0) {
        let resFile = await lastValueFrom(this.$fileS.create({ path: 'reliability/', file: files[0] }))
        this.item.imgs = resFile
        this.save()
      }
    } else {
      Swal.fire('Please save before upload imgs', '', 'error')
    }
  }
  async delete(img: any) {
    this.item.imgs = this.item.imgs.filter((img: any) => img.path != img.path)
    this.save()
    let resFile = await lastValueFrom(this.$fileS.delete(img))
  }
  async save() {
    try {
      await lastValueFrom(this.$equipment.createOrUpdate([this.item]))
      Swal.fire('Success', '', 'success')
      this.router.navigate(['admin/equipment2-new'],{
        queryParams:{
          name: this.item.name
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
}
