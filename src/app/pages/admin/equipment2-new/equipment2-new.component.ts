import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { EquipmentHttpService } from 'src/app/http/equipment-http.service';
import { HttpFileServeService } from 'src/app/http/http-file-serve.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-equipment2-new',
  templateUrl: './equipment2-new.component.html',
  styleUrls: ['./equipment2-new.component.scss']
})
export class Equipment2NewComponent implements OnInit {

  item: any = {
    name: '',
    description: '',
    imgs: []
  }
  preview: any = ''
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
  getData() {
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
        const renameFile = new File([files[0]], this.item.name, { type: files[0].type });
        let resFile = await lastValueFrom(this.$fileS.create({ path: 'reliability/', file: renameFile }))
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
      setTimeout(() => {
        this.router.navigate(['admin/equipment2-new'], {
          queryParams: {
            name: this.item.name
          }
        }).then(() => location.reload())
      }, 500);

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

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
  deleteEquipment() {
    Swal.fire({
      title: 'Delete ?',
      icon: 'warning',
      showCancelButton: true
    }).then(async (v: SweetAlertResult) => {
      if (v.isConfirmed) {
        const resDelete = await lastValueFrom(this.$equipment.deleteById(new HttpParams().set('_id', this.item._id)))
        if (resDelete && resDelete.deletedCount > 0) {
          Swal.fire('Success', '', 'success')
          setTimeout(() => {
            this.router.navigate(['admin/equipment2'])
          }, 500);
        } else {
          Swal.fire('Please try again', '', 'error')
        }
      }
    })
  }

}
